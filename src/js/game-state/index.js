import { FACE_CARDS } from "../common/consts.js";

export const generateInitialState = function() {
    return {
        deck: shuffleDeck(generateDeck()),
        currentBet: 0,
        playerCards: [],
        playerTotal: [0],
        dealerCards: [],
        dealerTotal: [0],
    }
};

export const generateDeck = function() {
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
};

export const getCardNumericValue = function(cardName) {
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
        throw new Error("Somehow a sneaky non-card value has made it in or this case hasn't been covered correctly.");
    }

    return numericValue;
};

export const shuffleDeck = function(deck) {
    const shuffledDeck = [...deck];
    for (let i = shuffledDeck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
    }

    return shuffledDeck;
};
