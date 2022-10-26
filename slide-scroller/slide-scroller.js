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
    let score = 0;

    const SCORE = 'Score : ';
    const GAME_OVER = 'Game over : Your final score is ';
    const color = {
        TEXT_SHADOW_COLOR: '#000000',
        TEXT_COLOR: '#FFFFFF'
    };

    const font = {
        SCORE_FONT: '40px Helvetica'
    };

    const SHADOW_BUFFER = 2;

    /**
     * Main entry point for slide scroller module
     */
    function initialize() {
        animate(0);
    }

    let gameOver = false;

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

        const prevEnemiesLength = enemies.length;
        enemies = enemies.filter(enemy => !enemy.markForDeletion);
        const currentEnemiesLength = enemies.length;
        score += prevEnemiesLength - currentEnemiesLength;
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

        displayStatusText();

        handleEnemies(deltaTime);

        if (isCollisionDetected()) {
            gameOver = true;
        }

        gameOver && displayGameOverText();
        !gameOver && requestAnimationFrame(animate);
    }

    /**
     * Returns whether collision has happened between enemy and player or not
     */
    function isCollisionDetected() {

        return enemies.some(enemy => {
            const distance = getLengthOfLine({ x: player.x + player.width / 2 - player.speed, y: player.y + player.height / 2 - player.vy },
                { x: enemy.x + enemy.width / 2, y: enemy.y + enemy.height / 2 });
            return distance <= enemy.radius + player.radius;
        });
    }

    /**
     * Get length of a line 
     * 
     * @param {number} point1 is the first coordinate 
     * @param {number} point2 is the second coordinate
     * 
     * @returns the length of a line, given that 2 coordiantes are provided 
     */
    function getLengthOfLine(point1 = { x: 0, y: 0 }, point2 = { x: 0, y: 0 }) {

        const dx = point2.x - point1.x;
        const dy = point2.y - point1.y;

        return Math.sqrt(dx * dx + dy * dy);
    }

    /**
     * Display status text to the canvas
     */
    function displayStatusText() {

        ctx.font = font.SCORE_FONT;
        ctx.fillStyle = color.TEXT_SHADOW_COLOR;
        ctx.fillText(SCORE + score, 20, 50);
        ctx.fillStyle = color.TEXT_COLOR;
        ctx.fillText(SCORE + score, 20 + SHADOW_BUFFER, 52 + SHADOW_BUFFER);
    }

    /**
     * Display Text For Game over
     */
    function displayGameOverText() {

        ctx.fillStyle = color.TEXT_SHADOW_COLOR;
        ctx.fillText(GAME_OVER + score, CANVAS_WIDTH / 2 - 300, CANVAS_HEIGHT / 2);
        ctx.fillStyle = color.TEXT_COLOR;
        ctx.fillText(GAME_OVER + score, CANVAS_WIDTH / 2 - 300 + SHADOW_BUFFER, CANVAS_HEIGHT / 2 + SHADOW_BUFFER);
    }

    return {
        initialize
    }

})();

slideScrollerModule.initialize();