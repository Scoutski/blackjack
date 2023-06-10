import { isEqual } from './tiny-isequal.js';

// This is only used in testing to ensure immutability.
export const checkDecksHaveSameMembersInSameOrder = (deck1, deck2) => {
    for (let i = 0; i < deck1.length; i++) {
        if (!isEqual(deck1[i], deck2[i])) {
            return false;
        }
    }

    return true;
};
