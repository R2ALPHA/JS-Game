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
    let enemies = [];

    let lastTime = 0;
    let enemyTimer = 0;
    let enemyInterval = 2000;
    let randomEnemyInterval = Math.random() * 1000 + 500;

    /**
     * Main entry point for slide scroller module
     */
    function initialize() {
        animate(0);
    }

    /**
     * Handle enemies
     */
    function handleEnemies(deltaTime) {

        if (enemyTimer > enemyInterval + randomEnemyInterval) {
            enemies.push(new Enemy(CANVAS_WIDTH, CANVAS_HEIGHT, enemyImage));
            enemyTimer = 0;
            randomEnemyInterval = Math.random() * 1000 + 500;
        } else {
            enemyTimer += deltaTime;
        }

        enemies.forEach(enemy => {
            enemy.update(deltaTime);
            enemy.draw(ctx);
        });

        enemies = enemies.filter(enemy => !enemy.markForDeletion);
    }

    /**
     * Animate object in canvas
     * 
     * @param {number} timeStamp is time since animation started
     */
    function animate(timeStamp) {

        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;

        background.update();
        background.draw(ctx);
        player.draw(ctx);
        player.update(input, deltaTime);

        handleEnemies(deltaTime);
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