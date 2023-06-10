/**
 * @jest-environment jsdom
 */

import { checkDecksHaveSameMembersInSameOrder } from '../common/utils.js';
import { dealInitialCards, getPlayerBet, isValidBet, removeBetFromPlayerState } from "./index.js";
import { generateInitialState } from '../game-state/index.js'
import { PLAYER_STATE } from '../common/consts.js';

describe('getPlayerBet', () => {
    it('should get the bet amount from the .bet-input input', () => {
        document.body.innerHTML = '<input class="bet-input">';

        const input = document.getElementsByClassName('bet-input')[0];
        input.value = '10';

        const result = getPlayerBet();
        expect(result).toEqual(10);
    });
});

describe('isValidBet', () => {
    it('should return false when the betAmount is NaN', () => {
        const result = isValidBet(NaN);

        expect(result).toEqual(false);
    });

    it('should return false when the betAmount is less than 1', () => {
        const result = isValidBet(-5);

        expect(result).toEqual(false);
    });

    it('should return false when the betAmount is more than 10% of the player states cash in hand (100 by default)', () => {
        const result = isValidBet(11);

        expect(result).toEqual(false);
    });

    it('should return true when the betAmount is between 1 and 10% of the player states cash in hand (100 by default)', () => {
        const result = isValidBet(5);

        expect(result).toEqual(true);
    });
});

describe('removeBetFromPlayerState', () => {
    // TODO: Should not use global state for the PLAYER_STATE so this isn't necessary
    it('should remove the appropriate amount from the global PLAYER_STATE', () => {
        expect(PLAYER_STATE.cashInHand).toEqual(100);
        removeBetFromPlayerState(10);
        expect(PLAYER_STATE.cashInHand).toEqual(90);
        PLAYER_STATE.cashInHand = 100;
    });
});

describe('dealInitialCards', () => {
    it('should not create a side effect by modifying the deck that was passed in', () => {
        console.log('PLAYER_STATE.cashInHand', PLAYER_STATE.cashInHand);
        const gameState = generateInitialState(10);
        const shuffledDeckClone = [ ...gameState.deck ];

        const updatedGameState = dealInitialCards(generateInitialState(10));

        expect(checkDecksHaveSameMembersInSameOrder(gameState.deck, shuffledDeckClone)).toEqual(true);
        expect(checkDecksHaveSameMembersInSameOrder(gameState.deck, updatedGameState.deck)).toEqual(false);
    });

    it('should remove 3 cards from the deck, 2 to the player and 1 to the dealer', () => {
        const gameState = generateInitialState(10);
        const deckClone = [ ...gameState.deck ];
    
        const updatedGameState = dealInitialCards(gameState);
    
        expect(updatedGameState.playerCards.length).toEqual(2);
        expect(updatedGameState.dealerCards.length).toEqual(1);
        expect(updatedGameState.deck.length).toEqual(deckClone.length - 3);
    });

    it('should update the cards in each players hands with the first 3 cards of the deck that was passed in', () => {
        const gameState = generateInitialState(10);
        const deckClone = [ ...gameState.deck ];

        const updatedGameState = dealInitialCards(gameState);
    
        expect(updatedGameState.playerCards[0]).toEqual(deckClone[0]);
        expect(updatedGameState.dealerCards[0]).toEqual(deckClone[1]);
        expect(updatedGameState.playerCards[1]).toEqual(deckClone[2]);
    });
});
