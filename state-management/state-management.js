import Player from './player.js';

/**
 * Module to learn how to manage different state in game
 */
var stateManagementModule = (function () {

    const dogImageElement = document.getElementById('dogImage');
    const loadingElement = document.getElementById('loading');
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    const CANVAS_WIDTH = canvas.width = window.innerWidth;
    const CANAVS_HEIGHT = canvas.height = window.innerHeight;

    const player = new Player(CANVAS_WIDTH, CANAVS_HEIGHT, dogImageElement);
    console.log("the player is", player);

    /**
     * Initalize state management module
     */
    function initialize() {
        addEventListener();
        player.draw(ctx);
    }

    /**
     * Attach event listener
     */
    function addEventListener() {
        window.addEventListener('load', () => loadingElement.style.display = 'none');
    }

    return {
        initialize
    }

})();

stateManagementModule.initialize();