import { playGame } from './game/index.js';

(() => {
    const startButton = document.getElementById('start-button');
    startButton.onclick = playGame;
})();