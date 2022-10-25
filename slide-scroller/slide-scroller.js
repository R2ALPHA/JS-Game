/**
 * Handle slide scroll for game 
 */
var slideScrollerModule = (function () {

    // DOM caching 
    const canvas = document.getElementById('canvas1');
    const playerImage = document.getElementById('playerImage');
    const backgroundImage = document.getElementById('backgroundImage');
    const enemyImage = document.getElementById('enemyImage');

    const ctx = canvas.getContext('2d');
    const CANVAS_WIDTH = canvas.width = 800;
    const CANVAS_HEIGHT = canvas.height = 720;

    const input = new InputHandler();
    const player = new Player(CANVAS_WIDTH, CANVAS_HEIGHT, playerImage);
    const background = new Background(CANVAS_WIDTH, CANVAS_HEIGHT, backgroundImage);
    const enemies = [];
    enemies.push(new Enemy(CANVAS_WIDTH, CANVAS_HEIGHT, enemyImage));

    /**
     * Main entry point for slide scroller module
     */
    function initialize() {
        animate();
    }

    /**
     * Handle enemies
     */
    function handleEnemies() {

        enemies.forEach(enemy => {
            enemy.update();
            enemy.draw(ctx);
        });
    }

    /**
     * Animate object in canvas
     */
    function animate() {

        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        background.update();
        background.draw(ctx);
        player.draw(ctx);
        player.update(input);

        handleEnemies();
        requestAnimationFrame(animate);
    }

    /**
     * Add event listener
     */
    function addEventListener() {
        window.addEventListener('load', () => { });
    }

    return {
        initialize
    }

})();

slideScrollerModule.initialize();