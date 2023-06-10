/**
 * @jest-environment jsdom
 */
import { getCardSVG, addTextToMessagesDiv, getInvalidCardPlacementLocationMessage, createCardImage, clearCardsOnDOM, addCardToDOM, addAllCardsToDOM } from './index.js';
import {
    DECK_FILEPATH,
    SVG_EXTENSION,
    MISSING_MESSAGES_ELEMENT_MESSAGE,
    INVALID_CARD_PLACEMENT_LOCATION_MESAGE,
    CARD_CLASS_NAME,
    MESSAGES_CLASS_NAME,
} from './consts.js';
import { PLAYER, DEALER } from '../common/consts.js';

const testCard = {
    displayValue: 'Ks',
    numericValue: 10,
}

describe('addAllCardsToDOM', () => {
    it('should add all the player cards to the DOM', () => {
        document.body.innerHTML = `<div class=${PLAYER}></div>`;

        const boardState = {
            playerCards: [testCard, testCard],
            dealerCards: []
        };

        addAllCardsToDOM(boardState);

        const playerElement = document.getElementsByClassName(PLAYER)[0];
        expect(playerElement.children.length).toEqual(2);
    });

    it('should add all the dealer cards to the DOM', () => {
        document.body.innerHTML = `<div class=${DEALER}></div>`;

        const boardState = {
            playerCards: [],
            dealerCards: [testCard, testCard]
        };

        addAllCardsToDOM(boardState);

        const dealerElement = document.getElementsByClassName(DEALER)[0];
        expect(dealerElement.children.length).toEqual(2);
    });
});

describe('clearCardsOnDOM', () => {
    it('should remove all elements in the dealer board area', () => {
        const testImage = '<img src="test"></img>';
        document.body.innerHTML =
            '<div>' +
                `<div class=${DEALER}>` +
                testImage +
                '</div>' +
                `<div class=${PLAYER}></div>` +
            '<div>'

        clearCardsOnDOM();

        const playerDiv = document.getElementsByClassName(DEALER)[0];
        expect(playerDiv.innerHTML).toEqual('');
    });

    it('should remove all elements in the player board area', () => {
        const testImage = '<img src="test"></img>';
        document.body.innerHTML =
            '<div>' +
                `<div class=${DEALER}></div>` +
                `<div class=${PLAYER}>` +
                testImage +
                '</div>' +
            '<div>'

        clearCardsOnDOM();

        const playerDiv = document.getElementsByClassName(PLAYER)[0];
        expect(playerDiv.innerHTML).toEqual('');
    });
});

describe('addCardToDOM', () => {
    it('should add a card to the .dealer element', () => {
        document.body.innerHTML = `<div class=${DEALER}></div>`;

        addCardToDOM(DEALER, testCard)

        const dealerDiv = document.getElementsByClassName(DEALER)[0];
        const cardImage = dealerDiv.firstChild;
        expect(cardImage.tagName).toEqual('IMG');
        expect(cardImage.src.endsWith(getCardSVG(testCard.displayValue))).toEqual(true);
    });

    it('should add a card to the .player element', () => {
        document.body.innerHTML = `<div class=${PLAYER}></div>`;

        addCardToDOM(PLAYER, testCard)

        const playerDiv = document.getElementsByClassName(PLAYER)[0];
        const cardImage = playerDiv.firstChild;
        expect(cardImage.tagName).toEqual('IMG');
        expect(cardImage.src.endsWith(getCardSVG(testCard.displayValue))).toEqual(true);
    });

    it('should throw an error message if an invalid location is given', () => {
        let error;
        const fakeLocation = 'chair';

        try {
            addCardToDOM(fakeLocation, testCard);
        } catch (e) {
            error = e;
        }

        expect(error.message).toEqual(getInvalidCardPlacementLocationMessage(fakeLocation));
    });
});

describe('getCardSVG', () => {
    it('should return the correct location string for the passed in card name', () => {
        const cardName = 'As';
        const svgLocation = getCardSVG(cardName);

        expect(svgLocation).toEqual(`${DECK_FILEPATH}${cardName}${SVG_EXTENSION}`)
    });
});

describe('addTextToMessagesDiv', () => {
    it('should set the given message to the first .messages elements innerText', () => {
        document.body.innerHTML =
        `<div class=${MESSAGES_CLASS_NAME}>` +
        '</div>';

        const testMessage = 'Black Knight is playable in 2023';

        addTextToMessagesDiv(testMessage);

        const messagesDiv = document.getElementsByClassName(MESSAGES_CLASS_NAME)[0];
        expect(messagesDiv.innerText).toEqual(testMessage);
    });

    it('should throw an error if .messages element can not be found', () => {
        document.body.innerHTML = '';
        let error;

        try {
            addTextToMessagesDiv('test');
        } catch (e) {
            error = e;
        }

        expect(error.message).toEqual(MISSING_MESSAGES_ELEMENT_MESSAGE);
    })
});

describe('getInvalidCardPlacementLocationMessage', () => {
    it('should return the error message for the provided invalid location', () => {
        const invalidLocation = 'barnes';
        const result = getInvalidCardPlacementLocationMessage(invalidLocation);
        expect(result).toEqual(`${INVALID_CARD_PLACEMENT_LOCATION_MESAGE} ${invalidLocation}`);
    });
});

describe('createCardImage', () => {
    it('should return an image element with the appropriate cardName SVG source', () => {
        const testCardName = 'Jc';
        const result = createCardImage(testCardName);

        expect(result.src.endsWith(getCardSVG(testCardName))).toEqual(true);
        expect(result.className).toEqual(CARD_CLASS_NAME);
    });
});
