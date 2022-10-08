var triggerAnimationModule = (function () {

    // DOM Caching
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    // Change the cursor type to pointer 
    canvas.style.cursor = 'pointer';

    let explosions = [];

    let canvasPositions = canvas.getBoundingClientRect();

    // Different screen have different device pixel ratio, based on dpr we need to calculate our current mouse position
    let dpr = window.devicePixelRatio;

    canvas.width = 500 * dpr;
    canvas.height = 700 * dpr;

    /**
     * Initialize trigger animation module 
     */
    function initialize() {

        addEventListener();
        animate();
    }

    /**
     * Add Event listener 
     */
    function addEventListener() {
        window.addEventListener('click', (e) => createAnimation(e));
    }

    /**
     * Create Animation object 
     * 
     * @param {MouseEvent} event is the mouse event 
     */
    function createAnimation(event) {

        let positionX = (event.x - canvasPositions.left) * dpr;
        let positionY = (event.y - canvasPositions.top) * dpr;

        explosions.push(new Explosion(positionX, positionY));
    }

    /**
     * Draw explosion animation 
     */
    function draw() {

        explosions.forEach(explosion => {

            explosion.update();
            explosion.draw(ctx);
        });

        // We are removing the explosion object, once all the frame for an image are rendered atleast once
        explosions = explosions.filter(explosion => explosion.frame <= 5);
    }

    /**
     * Animatae explosion 
     */
    function animate() {

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        draw();
        requestAnimationFrame(animate);
    }

    return {
        initialize
    }

})();

triggerAnimationModule.initialize();
