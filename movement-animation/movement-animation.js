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

    const modulesAvailable = {
        1: movementAnimation1Module,
        2: movementAnimation2Module
    };

    const modeSelectionElement = document.getElementById('movement');
    const INCORRECT_MODE_MESSAGE = "Incorrect mode selected, continuing with previos movement animation";

    let currentMode = modeSelectionElement.value;

    /**
     * Entry point for movement animation module 
     */
    function initialize() {

        initializeMovementModules();
        startAnimation(currentMode);
        addEventListener();
    }

    /**
     * Add event listener 
     */
    function addEventListener() {

        modeSelectionElement.onchange = (event) => {

            if (!event?.target?.value || !(event.target.value in modulesAvailable)) {
                alert(INCORRECT_MODE_MESSAGE);
                return;
            }

            currentMode = event.target.value;
            stopAllAnimation();
            startAnimation(currentMode);
        }
    }

    /**
     * Initialize all movement modules 
     */
    function initializeMovementModules() {

        for (const key in modulesAvailable) {
            modulesAvailable[key].initialize(ctx, CANVAS_WIDTH, CANVAS_HEIGHT);
        }
    }

    /**
     * Start animation 
     * 
     * @param {number} modeNumber is the current mode number
     */
    function startAnimation(modeNumber) {
        modulesAvailable[modeNumber].startAnimation();
    }

    /**
     * Stop all enemy animation
     */
    function stopAllAnimation() {

        for (const key in modulesAvailable) {
            modulesAvailable[key].stopAnimation(ctx, CANVAS_WIDTH, CANVAS_HEIGHT);
        }
    }

    return {
        initialize
    }

})();

movementAnimationModule.initialize();