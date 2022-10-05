/**
 * Handles movement animation (second type)
 */
var movementAnimation3Module = (function () {

    const enemiesArray = [];

    let numberOfEnemies = 100;

    // To slow down sprite switching
    let gameFrame = 0;

    let animationId = null;

    let ctx = null;
    let canvasWidth = 0;
    let canvasHeight = 0;

    /**
     * Initialize movement animation module 
     * 
     * @param {CanvasRenderingContext2D} context is the canvas context object 
     * @param {number} width is the width of the canvas  
     * @param {number} height is the height of the canvas 
     */
    function initialize(context, width, height) {

        ctx = context;
        canvasWidth = width;
        canvasHeight = height;

        createEnemyObjects();
    }

    /**
     * Create enemy object
     */
    function createEnemyObjects() {

        for (let i = 0; i < numberOfEnemies; ++i) {
            enemiesArray.push(new Enemy3());
        }
    }

    /**
     * Animate enemies, update the postion and draw the enemy object
     */
    function animateEnemies() {

        enemiesArray.forEach(enemy => {

            enemy.update(gameFrame, ctx);
            enemy.draw(ctx);
        });
    }

    /**
     * Perform animation 
     */
    function startAnimation() {

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        animateEnemies();

        gameFrame++;
        animationId = requestAnimationFrame(startAnimation)
    }

    /**
     * Stop animation by cancelling the animation frame 
     */
    function stopAnimation() {

        if (animationId === null) {
            return;
        }

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        cancelAnimationFrame(animationId);

        animationId = null;
    }

    return {
        initialize,
        startAnimation,
        stopAnimation
    }

})();