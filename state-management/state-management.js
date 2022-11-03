import Player from './player.js';
import InputHandler from './input-handler.js';
import { drawStatusText } from './util.js';

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
    const inputHandler = new InputHandler();

    /**
     * Initalize state management module
     */
    function initialize() {

        addEventListener();
        animate(0);
    }

    /**
     * Attach event listener
     */
    function addEventListener() {
        window.addEventListener('load', () => loadingElement.style.display = 'none');
    }

    /**
     * Animation loop
     */
    function animate() {

        clearCanvas();
        animatePlayer();
        drawStatusText(ctx, inputHandler);
        requestAnimationFrame(animate);
    }

    /**
     * Animate game player
     */
    function animatePlayer() {

        player.update(inputHandler.lastKey);
        player.draw(ctx);
    }

    /**
     * Clear canvas for repainting
     */
    function clearCanvas() {
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANAVS_HEIGHT);
    }

    return {
        initialize
    }

})();

stateManagementModule.initialize();