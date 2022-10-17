/**
 * This module handles raven drawing 
 */
var pointAndShootModule = (function () {

    // DOM Caching
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let ravens = [];

    // Time left before next raven arrival 
    let timeToNextRaven = 0;

    // Interval after which a new raven will be added
    let ravenInterval = 500;
    let lastTime = 0;

    /**
     * Entry point for point and shoot module 
     */
    function initialize() {
        animate(0);
    }

    /**
     * Animation function 
     * 
     * @param {number} timestamp is the time elapsed since the function starts running  
     */
    function animate(timestamp) {

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Find the delta time - interval after which we are getting into this loop
        let deltaTime = timestamp - lastTime;
        lastTime = timestamp;

        // Next raven will come into picture after exactly after 500ms. 
        timeToNextRaven += deltaTime;

        if (timeToNextRaven > ravenInterval) {
            ravens.push(new Raven());
            timeToNextRaven = 0;
        }

        // Draw and update the coordinate of raven 
        [...ravens].forEach(object => {
            object.update(deltaTime);
            object.draw(ctx);
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