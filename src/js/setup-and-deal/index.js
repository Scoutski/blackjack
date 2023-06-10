import { generateInitialState } from '../game-state/index.js';
import { addAllCardsToDOM, addTextToMessagesDiv, clearCardsOnDOM, displayPlayerBlackjackMessage } from '../dom-interactions/index.js';
import { PLAYER_STATE, PLAYER_SCORE_TEXT, PLAYER, DEALER } from '../common/consts.js';

// Philosophically, I do not want to have side effects in any functions, so anytime
// state is passed around, we are duplicating it and returning a new object with the
// relevant updates.
export const setupAndDeal = () => {
    // TODO: Clean up and make more readable
    const betAmount = getPlayerBet();
    if (!isValidBet(betAmount)) {
        addTextToMessagesDiv(`Invalid bet amount: ${betAmount}, please bet between 1 and ${.1 * PLAYER_STATE.cashInHand}`);
        return;
    } else {
        removeBetFromPlayerState(betAmount);
        // removeBetButtons();
    }

    let boardState = generateInitialState(betAmount);
    boardState = dealInitialCards(boardState);
    clearCardsOnDOM();
    addAllCardsToDOM(boardState);

    boardState = calculateScores(boardState);
    displayPlayerScores(boardState)

    const doesPlayerHaveBlackjack = checkForPlayerBlackJack(boardState);
    if (doesPlayerHaveBlackjack) {
        displayPlayerBlackjackMessage();
        processPayout(boardState.currentBet);
        resetButtons();
    } else {
        displayActionButtons()
        
    }
};

export const getPlayerBet = () => {
    const betInput = document.getElementsByClassName('bet-input')[0];
    return Math.round(Number(betInput.value));
};

export const isValidBet = (betAmount) => {
    let isValid = true;

    if (isNaN(betAmount)) {
        isValid = false;
    };

    if (betAmount < 1) {
        isValid = false;
    };

    if (betAmount > (.1 * PLAYER_STATE.cashInHand)) {
        isValid = false;
    };

    return isValid;
};

export const removeBetFromPlayerState = (betAmount) => {
    PLAYER_STATE.cashInHand -= betAmount;
};

export const dealInitialCards = (boardState) => {
    let updatedBoardState = { ...boardState };
   
    updatedBoardState = dealCard(updatedBoardState, PLAYER);
    updatedBoardState = dealCard(updatedBoardState, DEALER);
    updatedBoardState = dealCard(updatedBoardState, PLAYER);

    return updatedBoardState;
};

export const dealCard = (boardState, user) => {
    const updatedBoardState = { ...boardState };

    if (user === DEALER) {
        updatedBoardState.dealerCards.push(updatedBoardState.deck.shift());
    } else if (user === PLAYER) {
        updatedBoardState.playerCards.push(updatedBoardState.deck.shift());
    }

    return updatedBoardState;
};

const getValidTotals = (cards) => {
    // I don't think this works yet, only for 2 cards
    const cardValues = cards.map(card => card.numericValue);
    const allScores = cardValues.reduce((a, b) => a.flatMap(x => b.map(y => x + y)), [0])
    return allScores.filter(score => score <= 21);
};

const calculateScores = (boardState) => {
    const updatedBoardState = { ...boardState };
    updatedBoardState.dealerTotal = getValidTotals(updatedBoardState.dealerCards);
    updatedBoardState.playerTotal = getValidTotals(updatedBoardState.playerCards);

    return updatedBoardState;
}

const displayPlayerScores = (boardState) => {
    addTextToMessagesDiv(`${PLAYER_SCORE_TEXT} ${boardState.playerTotal.join(' / ')}`)
}

const checkForPlayerBlackJack = (boardState) => {
    const doesPlayerHaveTwoCards = boardState.playerCards.length === 2;
    const doesPlayerHaveTwentyOne = boardState.playerTotal.some(total => total === 21);

    return doesPlayerHaveTwoCards && doesPlayerHaveTwentyOne;
}

const processPayout = (betAmount) => {
    const payout = betAmount * 2;
    PLAYER_STATE.cashInHand += payout;
    console.log(`You've been paid out $${payout} and you now have $${PLAYER_STATE.cashInHand} remaining`);
}
