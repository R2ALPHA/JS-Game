/**
 * Main module to handle enemy animation 
 */
var movementAnimationModule = (function () {

    // The below comment will tell vs code that this is the canvas project, it will suggest us methods related to vs code only
    /** @type {HTMLCanvasElement} */
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    const CANVAS_WIDTH = canvas.width = 500;
    const CANVAS_HEIGHT = canvas.height = 1000;

    let numberOfEnemies = 100;
    let gameFrame = 0;

    const enemyObjects = {
        1: Array.apply(null, Array(numberOfEnemies)).map(e => new Enemy1()),
        2: Array.apply(null, Array(numberOfEnemies)).map(e => new Enemy2()),
        3: Array.apply(null, Array(numberOfEnemies)).map(e => new Enemy3()),
    };

    const modeSelectionElement = document.getElementById('movement');
    const INCORRECT_MODE_MESSAGE = "Incorrect mode selected, continuing with previos movement animation";

    let currentMode = modeSelectionElement.value;

    /**
     * Entry point for movement animation module 
     */
    function initialize() {

        addEventListener();
        startAnimation(currentMode);
    }

    /**
     * Add event listener 
     */
    function addEventListener() {

        modeSelectionElement.onchange = (event) => {

            if (!event?.target?.value || !(event.target.value in enemyObjects)) {
                alert(INCORRECT_MODE_MESSAGE);
                return;
            }

            gameFrame = 0;

            stopAnimation();
            currentMode = event.target.value;
            startAnimation();
        }
    }

    /**
     * Animate enemies, update the postion and draw the enemy object
     */
    function animateEnemies(enemyArray) {

        enemyArray.forEach(enemy => {

            enemy.update(gameFrame, ctx);
            enemy.draw(ctx);
        });
    }

    /**
     * Perform animation 
     */
    function startAnimation() {

        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        animateEnemies(enemyObjects[currentMode]);

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

        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        cancelAnimationFrame(animationId);

        animationId = null;
    }

    return {
        initialize
    }

})();

movementAnimationModule.initialize();