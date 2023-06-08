export const FACE_CARDS = ['J', 'Q', 'K'];

const playerState = {
    handsPlayed: 0,
    handsWon: 0,
    cashInHand: 100,
}

export const generateInitialState = () => {
    return {
        currentBet: 0,
        playerCards: [],
        playerTotal: [0],
        dealerCards: [],
        dealerTotal: [0],
    }
}

export const getCardNumericValue = (cardName) => {
    const FACE_CARD_VALUE = [10];
    const ACE_VALUE = [1, 11]

    let numericValue;
    if (typeof cardName === 'number') {
        if (cardName < 2 || cardName > 10) {
            throw new Error(`Invalid card number ${cardName} given`);
        }

        numericValue = [cardName];
    } else if (FACE_CARDS.includes(cardName)) {
        numericValue = FACE_CARD_VALUE;
    } else if (cardName === 'A') {
        numericValue = ACE_VALUE;
    }

    if (numericValue === undefined) {
        throw new Error("Somehow a sneaky non-card value has snuck in or it hasn't been covered");
    }

    return numericValue;
} 

export const generateDeck = () => {
    const SUITS = ['s', 'c', 'd', 'h'];
    const CARD_NAMES = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'];

    let deck = [];
    for (let i = 0; i < SUITS.length; i++) {
        for (let j = 0; j < CARD_NAMES.length; j++) {
            deck.push({
                displayValue: `${CARD_NAMES[j]}${SUITS[i]}`,
                numericValue: getCardNumericValue(CARD_NAMES[j]),
            });
        }
    }

    return deck;
}

export const shuffleDeck = (deck) => {
    const shuffledDeck = [...deck];
    for (let i = shuffledDeck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
    }

    return shuffledDeck;
}

export const dealCards = (deck, boardState) => {
    const updatedBoardState = { ...boardState };
    const updatedDeck = [ ...deck ];
    updatedBoardState.playerCards.push(updatedDeck.shift());
    updatedBoardState.dealerCards.push(updatedDeck.shift());
    updatedBoardState.playerCards.push(updatedDeck.shift());

    console.log('Dealer showing:', updatedBoardState.dealerCards.map((card) => card.displayValue));
    console.log('Player has:', updatedBoardState.playerCards.map((card) => card.displayValue));

    return [updatedDeck, updatedBoardState];
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

// Philosophically, I do not want to have side effects in any functions, so anytime
// state is passed around, we are duplicating it and returning a new object with the
// relevant updates.
const playGame = () => {
    // game setup phase
    let boardState = generateInitialState();
    /*
        This is if I want to handle betting:
        const betAmount = getPlayerBet();
        updateStateForBet(boardState, playerState)
    */
    let deck = generateDeck();
    deck = shuffleDeck(deck);
    [deck, boardState] = dealCards(deck, boardState);

    // check scores after dealing and end if player has blackjack
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

// playGame();
