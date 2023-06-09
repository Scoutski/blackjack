import { PLAYER, DEALER } from "../common/index.js";

export const addAllCardsToDOM = (boardState) => {
    clearCardsOnDOM();

    boardState.playerCards.forEach((card) => {
        addCardToDOM(PLAYER, card);
    });

    boardState.dealerCards.forEach((card) => {
        addCardToDOM(DEALER, card);
    });
};

export const clearCardsOnDOM = () => {
    document.getElementsByClassName(PLAYER)[0].innerText = '';
    document.getElementsByClassName(DEALER)[0].innerText = '';
};

export const addCardToDOM = (location, card) => {
    let domElement;

    if (location === DEALER) {
        domElement = document.getElementsByClassName(DEALER)[0];
    } else if (location === PLAYER) {
        domElement = document.getElementsByClassName(PLAYER)[0];
    }

    domElement.innerText += ' ' + card.displayValue;
};

export const addTextToMessagesDiv = (message) => {
    const messagesElement = document.getElementsByClassName('messages')[0];

    messagesElement.innerText = message;
};