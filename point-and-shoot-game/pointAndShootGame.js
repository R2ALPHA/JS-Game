/**
 * This module handles raven drawing 
 */
var pointAndShootModule = (function () {

    // DOM Caching
    const canvas = document.getElementById('foregroundCanvas');

    // The below comment will tell vs code that this is the canvas project, it will suggest us methods related to vs code only
    /** @type {HTMLCanvasElement} */
    const ctx = canvas.getContext('2d');

    const collisionCanvas = document.getElementById('collisionCanvas');
    const collisionCtx = collisionCanvas.getContext('2d');

    const CANVAS_WIDTH = collisionCanvas.width = canvas.width = window.innerWidth;
    const CANVAS_HEIGHT = collisionCanvas.height = canvas.height = window.innerHeight;
    const MOUSE_EVENT = {
        CLICK: 'click'
    };

    let ravens = [];
    let explosions = [];

    // Time left before next raven arrival 
    let timeToNextRaven = 0;

    // Interval after which a new raven will be added
    let ravenInterval = 500;
    let lastTime = 0;
    let isGameRunning = true;

    let score = 0;

    const color = {
        SCORE_COLOR: '#FFFFFF',
        SHADOW_COLOR: '#000000'
    };

    const CANVAS_FONT = '50px Impact';
    const SCORE = 'Score: ';

    const PIXEL_COUNT = 1;
    const CENTER_TEXT_ALIGN = 'center';
    const GAME_OVER_MESSAGE = 'GAME OVER : your final score is ';


    /**
     * Entry point for point and shoot module 
     */
    function initialize() {

        addEventListener();
        animate(0);
        setTimeout(() => {
            isGameRunning = false;
        }, 10000);
    }

    /**
     * Attach event listener
     */
    function addEventListener() {
        window.addEventListener(MOUSE_EVENT.CLICK, (event) => {

            const positionX = (event.x);
            const positionY = (event.y);

            // Get image data for 1 pixel only as of now
            const detectPixelColor = collisionCtx.getImageData(positionX, positionY, PIXEL_COUNT, PIXEL_COUNT)?.data ?? [0, 0, 0, 0];
            ravens.forEach(raven => {
                if (raven.randomColorArray[0] === detectPixelColor[0] && raven.randomColorArray[1] === detectPixelColor[1] &&
                    raven.randomColorArray[2] === detectPixelColor[2]
                ) {
                    raven.markedForDeletion = true;
                    score++;
                    explosions.push(new Explosion(raven.x, raven.y, raven.width));
                }
            });
        });
    }

    /**
     * Draw score text in canvas
     */
    function drawScore() {

        ctx.font = CANVAS_FONT;

        ctx.fillStyle = color.SHADOW_COLOR;
        ctx.fillText(SCORE + score, CANVAS_WIDTH - 200, 75);
        ctx.fillStyle = color.SCORE_COLOR;
        ctx.fillText(SCORE + score, CANVAS_WIDTH - 195, 80);
    }

    /**
     * Draw Game over text on canvas 
     */
    function drawGameOver() {

        ctx.textAlign = CENTER_TEXT_ALIGN;
        ctx.fillStyle = color.SHADOW_COLOR;
        ctx.fillText(GAME_OVER_MESSAGE + score, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
        ctx.fillStyle = color.SCORE_COLOR;
        ctx.fillText(GAME_OVER_MESSAGE + score, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
    }

    /**
     * Animation function 
     * 
     * @param {number} timestamp is the time elapsed since the function starts running  
     */
    function animate(timestamp) {

        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        collisionCtx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        drawScore();

        // Find the delta time - interval after which we are getting into this loop
        let deltaTime = timestamp - lastTime;
        lastTime = timestamp;

        // Next raven will come into picture after exactly after 500ms. 
        timeToNextRaven += deltaTime;

        if (timeToNextRaven > ravenInterval) {
            ravens.push(new Raven(CANVAS_WIDTH, CANVAS_HEIGHT));
            timeToNextRaven = 0;
            // Sort the raven by width, so that we will get a feeling some raven are very far from what we can see
            ravens.sort((a, b) => a.width - b.width);
        }

        // Draw and update raven and explosion object
        drawAndUpdateObjects(ravens, deltaTime);
        drawAndUpdateObjects(explosions, deltaTime);

        ravens = filterObjects(ravens);
        explosions = filterObjects(explosions);

        isGameRunning ? requestAnimationFrame(animate) : drawGameOver();
    }

    /**
     * Draw and update objects
     * 
     * @param {array} objects is an array of object 
     * @param {number} deltaTime is the time since last animation ran 
     */
    function drawAndUpdateObjects(objects, deltaTime) {

        [...objects].forEach(object => {
            object.update(deltaTime);
            object.draw(ctx, collisionCtx);
        });
    }

    /**
     * Filter/Remove object which are marke for deletion
     * 
     * @param {array} objects is an array of object 
     * 
     * @returns filtered object 
     */
    function filterObjects(objects) {
        return objects.filter(object => !object.markedForDeletion);
    }

    return {
        initialize
    }

})();

pointAndShootModule.initialize();