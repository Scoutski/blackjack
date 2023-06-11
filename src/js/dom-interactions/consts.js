import { PLAYER, DEALER } from '../common/consts.js';

const MISSING_ELEMENT_MESSAGE = 'Unable to find element with class .';

export const DECK_FILEPATH = 'assets/images/deck/';
export const SVG_EXTENSION = '.svg';

export const INVALID_CARD_PLACEMENT_LOCATION_MESAGE = `Invalid card placement location given, valid options are ${PLAYER} or ${DEALER}, was given`;
export const CARD_CLASS_NAME = 'card';

export const MESSAGES_CLASS_NAME = 'messages';
export const MISSING_MESSAGES_ELEMENT_MESSAGE = `${MISSING_ELEMENT_MESSAGE}messages`;

export const BLACKJACK_MESSAGE = 'Congratulations! Player has Blackjack!';

export const WALLET_CLASS_NAME = 'wallet';
export const WALLET_PREFIX_MESSAGE = 'Cash in wallet: ';
export const MISSING_WALLET_ELEMENT_MESSAGE = `${MISSING_ELEMENT_MESSAGE}wallet`;

export const START_BUTTON_CLASS_NAME = 'start-button';
export const BET_INPUT_CLASS_NAME = 'bet-input';

export const ELEMENT_TO_TOGGLE_NOT_FOUND_MESSAGE = 'Unable to find element to toggle display none with className ';