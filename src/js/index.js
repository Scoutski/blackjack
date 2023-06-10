import { startRound } from './setup-round/index.js';

(() => {
    const startButton = document.getElementById('start-button');
    startButton.onclick = startRound;
})();