import isEqual from 'lodash.isequal';
import { generateInitialState, getCardNumericValue, generateDeck, shuffleDeck, dealCards, FACE_CARDS } from "./blackjack";

const checkDecksHaveSameMembersInSameOrder = (deck1, deck2) => {
    for (let i = 0; i < deck1.length; i++) {
        if (!isEqual(deck1[i], deck2[i])) {
            return false;
        }
    }

    return true;
}

describe('generateInitialState', () => {
    it('should return expected empty state', () => {
        const result = generateInitialState();

        expect(result).toEqual({
            currentBet: 0,
            playerCards: [],
            playerTotal: [0],
            dealerCards: [],
            dealerTotal: [0],
        });
    })
})

describe('getCardNumericValue', () => {
    it('should return [x] when x number between 2-10 is given', () => {
        const min = Math.ceil(2);
        const max = Math.floor(10);
        const number = Math.floor(Math.random() * (max - min + 1) + min);

        const result = getCardNumericValue(number);

        expect(result).toEqual([number]);
    });

    it('should return [10] when J, Q or K is given', () => {
        const chosenCard = FACE_CARDS[(Math.floor(Math.random() * FACE_CARDS.length))];

        const result = getCardNumericValue(chosenCard);

        expect(result).toEqual([10]);
    });

    it('should return [1, 11] when A is given', () => {
        const result = getCardNumericValue('A');

        expect(result).toEqual([1,11]);
    });

    it('should throw an error when a number lower than the 2-10 range is given', () => {
        let error;

        try {
            getCardNumericValue(1);
        } catch (e) {
            error = e;
        }

        expect(error.message).toEqual('Invalid card number 1 given');
    });

    it('should throw an error when a number greater than the 2-10 range is given', () => {
        let error;

        try {
            getCardNumericValue(11);
        } catch (e) {
            error = e;
        }

        expect(error.message).toEqual('Invalid card number 11 given');
    });

    it('should throw an error when any non-expected card value is given', () => {
        let error;

        try {
            getCardNumericValue('X');
        } catch (e) {
            error = e;
        }

        expect(error.message).toEqual("Somehow a sneaky non-card value has snuck in or it hasn't been covered");
    });
});

describe('generateDeck', () => {
    it('should return a 52 card deck', () => {
        const deck = generateDeck();

        expect(deck.length).toEqual(52);
    });

    it('should return a deck with 13 of each suit', () => {
        const deck = generateDeck();

        const result = deck.reduce((
            count,
            currentValue
        ) => {
            const finalCharacter = currentValue.displayValue.length - 1;
            return (
                count[currentValue.displayValue[finalCharacter]] ? ++count[currentValue.displayValue[finalCharacter]] : (count[currentValue.displayValue[finalCharacter]] = 1),
                count
            );
        },
        {});

        expect(result.s).toEqual(13);
        expect(result.c).toEqual(13);
        expect(result.d).toEqual(13);
        expect(result.h).toEqual(13);
    });
});

describe('shuffleDeck', () => {
    it('should not create a side effect by modifying the deck that was passed in', () => {
        const deck = generateDeck();
        const deckClone = { ...deck };
        shuffleDeck(deck);

        expect(checkDecksHaveSameMembersInSameOrder(deck, deckClone)).toEqual(true);
    });

    it('should return a 52 card deck with members in a different order', () => {
        // This test is technically flakey once in a million years.
        const deck = generateDeck();
        expect(deck.length).toEqual(52);

        const result = shuffleDeck(deck);

        expect(checkDecksHaveSameMembersInSameOrder(deck, result)).toEqual(false);
        expect(result.length).toEqual(52);
    });
});

describe('dealCards', () => {
    it('should not create a side effect by modifying the deck that was passed in', () => {
        const shuffledDeck = shuffleDeck(generateDeck());
        const shuffledDeckClone = [ ...shuffledDeck ];

        const [updatedDeck] = dealCards(shuffledDeck, generateInitialState());

        expect(checkDecksHaveSameMembersInSameOrder(shuffledDeck, shuffledDeckClone)).toEqual(true);
        expect(checkDecksHaveSameMembersInSameOrder(shuffledDeck, updatedDeck)).toEqual(false);
    });

    it('should remove 3 cards from the deck, 2 to the player and 1 to the dealer', () => {
        const boardState = generateInitialState();;
        const deck = generateDeck();
        const shuffledDeck = shuffleDeck(deck);
    
        const [updatedDeck, updatedBoardState] = dealCards(shuffledDeck, boardState);
    
        expect(updatedBoardState.playerCards.length).toEqual(2);
        expect(updatedBoardState.dealerCards.length).toEqual(1);
        expect(updatedDeck.length).toEqual(shuffledDeck.length - 3);
    });

    it('should update the cards in each players hands with the first 3 cards of the deck that was passed in', () => {
        const boardState = generateInitialState();;
        const deck = generateDeck();
        const shuffledDeck = shuffleDeck(deck);

        const [updatedDeck, updatedBoardState] = dealCards(shuffledDeck, boardState);
    
        expect(updatedBoardState.playerCards[0]).toEqual(shuffledDeck[0]);
        expect(updatedBoardState.dealerCards[0]).toEqual(shuffledDeck[1]);
        expect(updatedBoardState.playerCards[1]).toEqual(shuffledDeck[2]);
    });
});