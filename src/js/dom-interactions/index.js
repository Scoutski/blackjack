import { PLAYER, DEALER } from "../common/consts.js";

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
    }

    console.log('card', card);

    domElement.appendChild(createCardImage(card.displayValue));
};

export const createCardImage = (cardName) => {
    const cardImage = document.createElement('img');
    cardImage.src = getCardSVG(cardName);
    cardImage.className = 'card';

    return cardImage;
};

export const getCardSVG = (cardName) => {
    return `assets/images/deck/${cardName}.svg`;
};

export const addTextToMessagesDiv = (message) => {
    const messagesElement = document.getElementsByClassName('messages')[0];

    messagesElement.innerText = message;
};