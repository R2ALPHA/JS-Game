/**
 * This module handles raven drawing 
 */
var pointAndShootModule = (function () {

    // DOM Caching
    const canvas = document.getElementById('foregroundCanvas');
    const ctx = canvas.getContext('2d');

    const collisionCanvas = document.getElementById('collisionCanvas');
    const collisionCtx = collisionCanvas.getContext('2d');

    const CANVAS_WIDTH = collisionCanvas.width = canvas.width = window.innerWidth;
    const CANVAS_HEIGHT = collisionCanvas.height = canvas.height = window.innerHeight;

    let ravens = [];

    // Time left before next raven arrival 
    let timeToNextRaven = 0;

    // Interval after which a new raven will be added
    let ravenInterval = 500;
    let lastTime = 0;

    let score = 0;

    const color = {
        SCORE_COLOR: '#FFFFFF',
        SHADOW_COLOR: '#000000'
    };

    const CANVAS_FONT = '50px Impact';

    /**
     * Entry point for point and shoot module 
     */
    function initialize() {

        addEventListener();
        animate(0);
    }

    function addEventListener() {
        window.addEventListener('click', (event) => {

            const positionX = (event.x);
            const positionY = (event.y);

            // Get image data for 1 pixel only as of now
            const detectPixelColor = collisionCtx.getImageData(positionX, positionY, 1, 1).data;
            ravens.forEach(raven => {
                if (raven.randomColorArray[0] === detectPixelColor[0] && raven.randomColorArray[1] === detectPixelColor[1] &&
                    raven.randomColorArray[2] === detectPixelColor[2]
                ) {
                    raven.markedForDeletion = true;
                    score++;
                }
            });
        });
    }

    /**
     * Draw score object in canvas
     */
    function drawScore() {

        ctx.font = CANVAS_FONT;

        ctx.fillStyle = color.SHADOW_COLOR;
        ctx.fillText('Score: ' + score, CANVAS_WIDTH - 200, 75);
        ctx.fillStyle = color.SCORE_COLOR;
        ctx.fillText('Score: ' + score, CANVAS_WIDTH - 195, 80);
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

        // Draw and update the coordinate of raven 
        [...ravens].forEach(object => {
            object.update(deltaTime);
            object.draw(ctx, collisionCtx);
        });


        // Remove the raven which are marked for deletion 
        ravens = ravens.filter(raven => !raven.markedForDeletion);
        requestAnimationFrame(animate);
    }

    return {
        initialize
    }

})();

pointAndShootModule.initialize();