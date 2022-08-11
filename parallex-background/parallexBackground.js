/**
 * Handles parallex background
 */
var parallexBackgroundModule = (function () {

    // DOM caching
    const canvas = document.getElementById('canvas');
    const sliderElement = document.getElementById('slider');
    const showGameSpeed = document.getElementById('showGameSpeed');

    const ctx = canvas.getContext('2d');

    const CANVAS_WIDTH = canvas.width = 800;
    const CANVAS_HEIGHT = canvas.height = 700;

    let gameSpeed = 5;

    const layerObjects = [];

    /**
     * Entry point of the module. 
     */
    function initialize() {

        sliderElement.value = gameSpeed;
        showGameSpeed.innerHTML = gameSpeed;

        addLayerObjects();
        addEventListener();
        animate();
    }

    /**
     * Add layer objects for parallax background
     */
    function addLayerObjects() {

        for (let index = 0; index < 5; ++index) {
            // For parallax the foreground should move faster. 
            // In our case all the background image are moving at a same rate but the foreground is moving faster
            layerObjects.push(createLayerObject(index + 1, index === 4 ? 1 : 0.5));
        }
    }

    /**
     * Performs animation of background
     */
    function animate() {

        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        layerObjects.forEach(object => object.drawAndUpdateLayerPosition(ctx, gameSpeed));

        requestAnimationFrame(animate);
    }

    /**
     * Attach event listener
     */
    function addEventListener() {
        sliderElement.onchange = gameSpeedHandler;
    }

    /**
     * Handles game speed input from user
     * 
     * @param {MouseEvent} event is the mouse event  
     */
    function gameSpeedHandler(event) {

        if (!event) {
            return;
        }

        gameSpeed = event.target.value;
        showGameSpeed.innerHTML = gameSpeed;
    }

    /**
     * Create layer object to be used in parallax background 
     * 
     * @param {number} imageIndex is the image index 
     * @param {number} speed is the speed at which background moves
     *  
     * @returns Layer  
     */
    function createLayerObject(imageIndex, speed) {

        const backgroundLayer = new Image();
        backgroundLayer.src = `./resource/layer-${imageIndex}.png`;

        return new Layer(backgroundLayer, speed);
    }

    return {
        initialize
    }

})();


parallexBackgroundModule.initialize();