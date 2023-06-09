import { generateInitialState } from './game-state/index.js';
import { PLAYER_STATE } from './common/index.js';

// Philosophically, I do not want to have side effects in any functions, so anytime
// state is passed around, we are duplicating it and returning a new object with the
// relevant updates.
const playGame = () => {
    let boardState = generateInitialState();
    /*
        This is if I want to handle betting:
        const betAmount = getPlayerBet();
        updateStateForBet(boardState, playerState)
    */
    boardState = dealCards(boardState);
    boardState = calculateScores(boardState);
    displayPlayerScores(boardState)
    const doesPlayerHaveBlackjack = checkForPlayerBlackJack(boardState);

    if (doesPlayerHaveBlackjack) {
        displayPlayerBlackjackMessage();
        processPayout(boardState);
        // endGame();
    } else {
        // getPlayerInput();
        // checkForBust();
        // processDealerTurn();
        // calculateScore();
        // updateTotals();
        // clearBoardState();
    }
};

export const dealCards = (boardState) => {
    const updatedBoardState = { ...boardState };
    updatedBoardState.playerCards.push(updatedBoardState.deck.shift());
    updatedBoardState.dealerCards.push(updatedBoardState.deck.shift());
    updatedBoardState.playerCards.push(updatedBoardState.deck.shift());

    console.log('Dealer showing:', updatedBoardState.dealerCards.map((card) => card.displayValue));
    console.log('Player has:', updatedBoardState.playerCards.map((card) => card.displayValue));

    return updatedBoardState;
}

const getValidTotals = (cards) => {
    // I don't think this works yet, only for 2 cards
    const cardValues = cards.map(card => card.numericValue);
    const allScores = cardValues.reduce((a, b) => a.flatMap(x => b.map(y => x + y)), [0])
    return allScores.filter(score => score <= 21);
}

const calculateScores = (boardState) => {
    const updatedBoardState = { ...boardState };
    updatedBoardState.dealerTotal = getValidTotals(updatedBoardState.dealerCards);
    updatedBoardState.playerTotal = getValidTotals(updatedBoardState.playerCards);

    return updatedBoardState;
}

const displayPlayerScores = (boardState) => {
    console.log('Player score(s) is', boardState.playerTotal);
}

const checkForPlayerBlackJack = (boardState) => {
    const doesPlayerHaveTwoCards = boardState.playerCards.length === 2;
    const doesPlayerHaveTwentyOne = boardState.playerTotal.some(total => total === 21);

    return doesPlayerHaveTwoCards && doesPlayerHaveTwentyOne;
}

const displayPlayerBlackjackMessage = () => {
    console.log('Congratulations! Player has Blackjack!')
}

const processPayout = (boardState) => {

}

const getPlayerInput = () => {
    // prompt is not available in node, is only available in browser console, need to polyfill.
    // const playerInput = prompt('Would you like to (H) Hit or (S) Stand?');

    // console.log('player has decided to', playerInput);
}

playGame();
