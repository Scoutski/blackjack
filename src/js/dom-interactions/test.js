/**
 * @jest-environment jsdom
 */
import {
    getCardSVG,
    addTextToMessagesDiv,
    getInvalidCardPlacementLocationMessage,
    createCardImage,
    clearCardsOnDOM,
    addCardToDOM,
    addAllCardsToDOM,
    displayPlayerBlackjackMessage,
    updateWalletOnDOM,
    toggleElementDisplay,
    toggleBetInterface
} from './index.js';
import {
    DECK_FILEPATH,
    SVG_EXTENSION,
    MISSING_MESSAGES_ELEMENT_MESSAGE,
    INVALID_CARD_PLACEMENT_LOCATION_MESAGE,
    CARD_CLASS_NAME,
    MESSAGES_CLASS_NAME,
    BLACKJACK_MESSAGE,
    WALLET_CLASS_NAME,
    WALLET_PREFIX_MESSAGE,
    MISSING_WALLET_ELEMENT_MESSAGE,
    ELEMENT_TO_TOGGLE_NOT_FOUND_MESSAGE,
    START_BUTTON_CLASS_NAME,
    BET_INPUT_CLASS_NAME,
} from './consts.js';
import { PLAYER, DEALER, PLAYER_STATE } from '../common/consts.js';

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
    it(`should set the given message to the first .${MESSAGES_CLASS_NAME} elements innerText`, () => {
        document.body.innerHTML =
        `<div class=${MESSAGES_CLASS_NAME}></div>`;

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

describe('displayPlayerBlackjackMessage', () => {
    it('should add the BLACKJACK_MESSAGE to the messages div', () => {
        document.body.innerHTML =
        `<div class=${MESSAGES_CLASS_NAME}></div>`;

        displayPlayerBlackjackMessage();

        const messagesDiv = document.getElementsByClassName(MESSAGES_CLASS_NAME)[0];
        expect(messagesDiv.innerText).toEqual(BLACKJACK_MESSAGE);
    });
});

describe('updateWalletOnDOM', () => {
    it(`should set the current wallet total to the first .${WALLET_CLASS_NAME} elements innerText`, () => {
        document.body.innerHTML =
        `<div class=${WALLET_CLASS_NAME}></div>`;

        updateWalletOnDOM();

        const walletDiv = document.getElementsByClassName(WALLET_CLASS_NAME)[0];
        expect(walletDiv.innerText).toEqual(`${WALLET_PREFIX_MESSAGE}${PLAYER_STATE.cashInHand}`);
    });

    it(`should throw an error if the .${WALLET_CLASS_NAME} element can not be found`, () => {
        document.body.innerHTML = '';
        let error;

        try {
            updateWalletOnDOM();
        } catch (e) {
            error = e;
        }

        expect(error.message).toEqual(MISSING_WALLET_ELEMENT_MESSAGE);
    })
});

describe('toggleBetInterface', () => {
    it('should hide the bet interface is they are currently visible', () => {
        document.body.innerHTML =
        '<div>' +
            `<div class="${START_BUTTON_CLASS_NAME}" />` +
            `<div class="${BET_INPUT_CLASS_NAME}" />` +
        '</div>';

        toggleBetInterface();

        const startButtonElement = document.getElementsByClassName(START_BUTTON_CLASS_NAME)[0];
        const betInputElement = document.getElementsByClassName(BET_INPUT_CLASS_NAME)[0];

        expect(startButtonElement.style.display).toEqual('none');
        expect(betInputElement.style.display).toEqual('none');
    });

    it('should show the bet interface is they are currently hidden', () => {
        document.body.innerHTML =
        '<div>' +
            `<div class="${START_BUTTON_CLASS_NAME}" style="display: none;"></div>` +
            `<div class="${BET_INPUT_CLASS_NAME}" style="display: none;"></div>` +
        '</div>';

        toggleBetInterface();

        const startButtonElement = document.getElementsByClassName(START_BUTTON_CLASS_NAME)[0];
        const betInputElement = document.getElementsByClassName(BET_INPUT_CLASS_NAME)[0];

        expect(startButtonElement.style.display).toEqual('');
        expect(betInputElement.style.display).toEqual('');
    });
});

describe('toggleElementDisplay', () => {
    it('should set an element to display none if it is currently visible', () => {
        const testClassName = 'Thrall';
        document.body.innerHTML = `<div class=${testClassName}></div>`;

        toggleElementDisplay(testClassName);

        const element = document.getElementsByClassName(testClassName)[0];
        expect(element.style.display).toEqual('none');
    });

    it('should set an element to display "" if it is currently hidden', () => {
        const testClassName = 'Thrall';
        document.body.innerHTML = `<div class=${testClassName} style="display: none;"></div>`;

        toggleElementDisplay(testClassName);

        const element = document.getElementsByClassName(testClassName)[0];
        expect(element.style.display).toEqual('');
    });

    it('should throw an error if unable to find elements with the specified class name', () => {
        document.body.innerHTML = '';
        let error;

        const testFakeClassName = 'Akama';

        try {
            toggleElementDisplay(testFakeClassName);
        } catch (e) {
            error = e;
        }

        expect(error.message).toEqual(`${ELEMENT_TO_TOGGLE_NOT_FOUND_MESSAGE}${testFakeClassName}`);
    });
});
