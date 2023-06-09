import { checkDecksHaveSameMembersInSameOrder } from './common';
import { dealCards } from "./blackjack";
import { generateInitialState } from './game-state'

describe('dealCards', () => {
    it('should not create a side effect by modifying the deck that was passed in', () => {
        const gameState = generateInitialState();
        const shuffledDeckClone = [ ...gameState.deck ];

        const updatedGameState = dealCards(generateInitialState());

        expect(checkDecksHaveSameMembersInSameOrder(gameState.deck, shuffledDeckClone)).toEqual(true);
        expect(checkDecksHaveSameMembersInSameOrder(gameState.deck, updatedGameState.deck)).toEqual(false);
    });

    it('should remove 3 cards from the deck, 2 to the player and 1 to the dealer', () => {
        const gameState = generateInitialState();
        const deckClone = [ ...gameState.deck ];
    
        const updatedGameState = dealCards(gameState);
    
        expect(updatedGameState.playerCards.length).toEqual(2);
        expect(updatedGameState.dealerCards.length).toEqual(1);
        expect(updatedGameState.deck.length).toEqual(deckClone.length - 3);
    });

    it('should update the cards in each players hands with the first 3 cards of the deck that was passed in', () => {
        const gameState = generateInitialState();
        const deckClone = [ ...gameState.deck ];

        const updatedGameState = dealCards(gameState);
    
        expect(updatedGameState.playerCards[0]).toEqual(deckClone[0]);
        expect(updatedGameState.dealerCards[0]).toEqual(deckClone[1]);
        expect(updatedGameState.playerCards[1]).toEqual(deckClone[2]);
    });
});