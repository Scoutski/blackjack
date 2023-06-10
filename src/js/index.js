import { setupAndDeal } from './setup-and-deal/index.js';

(() => {
    const startButton = document.getElementById('start-button');
    startButton.onclick = setupAndDeal;
})();