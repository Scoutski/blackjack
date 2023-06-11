import { updateWalletOnDOM } from './dom-interactions/index.js';
import { setupAndDeal } from './setup-and-deal/index.js';

(() => {
    updateWalletOnDOM();

    const startButton = document.getElementsByClassName('start-button')[0];
    startButton.onclick = setupAndDeal;
})();