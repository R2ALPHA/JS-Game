import Game from './game.js';

// Attach event listener for window on load
window.addEventListener('load', () => {

    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');

    const CANVAS_WIDTH = canvas.width = 500;
    const CANVAS_HEIGHT = canvas.height = 500;
    const game = new Game(CANVAS_WIDTH, CANVAS_HEIGHT);

    let lastTime = 0;

    /**
     * Main animate function for canvas 
     * 
     * @param {number} timeStamp is the time passed since the first animation  
     */
    function animate(timeStamp) {

        // Calculate difference in rendering between two frame
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;

        clearCanvas();
        game.update(deltaTime);
        game.draw(ctx);

        // If game is over then stop the request animation frame
        !game.gameOver && requestAnimationFrame(animate);
    }

    /**
     * Clear canvas before each paint 
     */
    function clearCanvas() {
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }

    animate(0);
});

