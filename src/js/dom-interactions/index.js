export const addCardToBoard = (location, card) => {
    let domElement;

    if (location === 'dealer') {
        domElement = document.getElementsByClassName('dealer')[0];
    } else if (location === 'player') {
        domElement = document.getElementsByClassName('player')[0];
    }

    domElement.innerText += ' ' + card.displayValue;
};

export const addTextToMessagesDiv = (message) => {
    const messagesElement = document.getElementsByClassName('messages')[0];

    messagesElement.innerText = message;
};