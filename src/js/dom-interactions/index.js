import { PLAYER, DEALER } from '../common/consts.js';
import {
    INVALID_CARD_PLACEMENT_LOCATION_MESAGE,
    DECK_FILEPATH,
    SVG_EXTENSION,
    MISSING_MESSAGES_ELEMENT_MESSAGE,
    MESSAGES_CLASS_NAME,
    CARD_CLASS_NAME
} from './consts.js';

export const addAllCardsToDOM = (boardState) => {
    boardState.playerCards.forEach((card) => {
        addCardToDOM(PLAYER, card);
    });

    boardState.dealerCards.forEach((card) => {
        addCardToDOM(DEALER, card);
    });
};

export const clearCardsOnDOM = () => {
    document.getElementsByClassName(PLAYER)[0].innerHTML = '';
    document.getElementsByClassName(DEALER)[0].innerHTML = '';
};

export const addCardToDOM = (location, card) => {
    let domElement;

    if (location === DEALER) {
        domElement = document.getElementsByClassName(DEALER)[0];
    } else if (location === PLAYER) {
        domElement = document.getElementsByClassName(PLAYER)[0];
    } else {
        throw new Error(getInvalidCardPlacementLocationMessage(location));
    }

    domElement.appendChild(createCardImage(card.displayValue));
};

export const getInvalidCardPlacementLocationMessage = (location) => {
    return `${INVALID_CARD_PLACEMENT_LOCATION_MESAGE} ${location}`;
}

export const createCardImage = (cardName) => {
    const cardImage = document.createElement('img');
    cardImage.src = getCardSVG(cardName);
    cardImage.className = CARD_CLASS_NAME;

    return cardImage;
};

export const getCardSVG = (cardName) => {
    // TODO: Add validation that the file exists or throw an error
    return `${DECK_FILEPATH}${cardName}${SVG_EXTENSION}`;
};

export const addTextToMessagesDiv = (message) => {
    const messagesElement = document.getElementsByClassName(MESSAGES_CLASS_NAME)[0];

    if (!messagesElement) {
        throw new Error(MISSING_MESSAGES_ELEMENT_MESSAGE);
    }

    messagesElement.innerText = message;
};