/**
 * Handle slide scroll for game 
 */
var slideScrollerModule = (function () {

    // DOM caching 
    const canvas = document.getElementById('canvas1');
    const playerImage = document.getElementById('playerImage');
    const backgroundImage = document.getElementById('backgroundImage');
    const enemyImage = document.getElementById('enemyImage');
    const coinImage = document.getElementById('coinImage');
    const startGameButton = document.getElementById('startGame');

    const ctx = canvas.getContext('2d');
    const CANVAS_WIDTH = canvas.width = 800;
    const CANVAS_HEIGHT = canvas.height = 720;

    const input = new InputHandler();
    let player = new Player(CANVAS_WIDTH, CANVAS_HEIGHT, playerImage);
    let background = new Background(CANVAS_WIDTH, CANVAS_HEIGHT, backgroundImage);
    let enemies = [];
    let coins = [];

    let lastTime = 0;
    let enemyTimer = 0;
    let enemyInterval = 2000;
    let randomEnemyInterval = Math.random() * 1000 + 500;

    let coinTimer = 0;
    let coinInterval = 1000;
    let randomCoinInterval = Math.random() * 1000;

    let speedInterval = 2000;
    let randomSpeedInterval = Math.random() * 500;
    let speedTimer = 0;

    let score = 0;

    const SCORE = 'Score : ';
    const GAME_OVER = 'Game over : Your final score is ';
    const START_GAME = 'JUMP $ ROLL ';
    const BLOCK = 'block';
    const NONE = 'none';
    const GO_TO_START = 'Press Enter or Swipe Up to go to start page';

    const color = {
        STROKE_COLOR: '#000000',
        FILL_COLOR: '#FFFFFF',
    };

    const font = {
        SCORE_FONT: '40px Impact',
        GAME_START_FONT: '100px Impact'
    };

    let gameOver = false;
    let gameStarted = false;

    // https://opengameart.org/content/jump-and-run-8-bit
    const gameSound = new Audio();
    gameSound.src = './resource/game_song.ogg';

    // https://opengameart.org/content/coin-sound-effect-harmonica
    const coinSound = new Audio();
    coinSound.src = './resource/coin.mp3';

    const explosionSound = new Audio();
    explosionSound.src = './resource/boom.wav';

    const dummyEnemy = new Enemy(CANVAS_WIDTH, CANVAS_HEIGHT, enemyImage);
    let dummyCoin = new Coin(CANVAS_WIDTH, CANVAS_HEIGHT, coinImage);

    const align = {
        LEFT: 'left',
        CENTER: 'center'
    };

    /**
     * Main entry point for slide scroller module
     */
    function initialize() {

        addEventListener();
        animate(0);
    }

    /**
     * Attach event listener
     */
    function addEventListener() {
        startGameButton.onclick = startGame;
    }

    /**
     * Start Game 
     */
    function startGame() {

        gameSound.loop = true;
        gameSound.play();
        gameStarted = true;

        startGameButton.style.display = NONE;
    }

    /**
     * Reset Game
     */
    function resetGame() {

        if (!gameOver) {
            return;
        }

        gameStarted = false;
        gameOver = false;
        score = 0;
        coins = [];
        enemies = [];

        player = new Player(CANVAS_WIDTH, CANVAS_HEIGHT, playerImage);
        background = new Background(CANVAS_WIDTH, CANVAS_HEIGHT, backgroundImage);

        animate(0);

        startGameButton.style.display = BLOCK;
        window.removeEventListener('click', resetGame)
    }

    function handleSpeed(deltaTime) {

        if (speedTimer > speedInterval + randomSpeedInterval) {

            enemies.forEach(enemy => enemy.increaseSpeed());
            coins.forEach(coin => coin.increaseSpeed());

            speedTimer = 0;
            randomSpeedInterval = Math.random() * 500;
        } else {
            speedTimer += deltaTime;
        }
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
     * Handle coins
     * 
     * @param {number} deltaTime is the time difference between two animation frame requests 
     */
    function handleCoins(deltaTime) {

        if (coinTimer > coinInterval + randomCoinInterval) {
            coins.push(new Coin(CANVAS_WIDTH, CANVAS_HEIGHT, coinImage));
            coinTimer = 0;
            randomCoinInterval = Math.random() * 1000 + 500;
        } else {
            coinTimer += deltaTime;
        }

        coins.forEach(coin => {
            coin.update(deltaTime);
            coin.draw(ctx);
        });

        const cointHitIndex = getCollisionHitIndex(coins);
        if (cointHitIndex !== -1) {
            score++;
            coins[cointHitIndex].markForDeletion = true;
            coinSound.play();
        }

        coins = coins.filter(coin => !coin.markForDeletion);
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

        !gameStarted && animateBefore(deltaTime);
        gameStarted && animateAfter(deltaTime);
    }

    /**
     * Handles animation when game has not yet started 
     * 
     * @param {number} deltaTime is the difference in time between two animation frame 
     */
    function animateBefore(deltaTime) {

        player.draw(ctx);
        player.update(input, deltaTime);

        dummyEnemy.update(deltaTime);
        dummyEnemy.draw(ctx);

        dummyCoin.update(deltaTime);
        dummyCoin.draw(ctx);

        if (getCollisionHitIndex([dummyEnemy]) !== -1 || dummyEnemy.getX() < 0) {
            dummyEnemy.setX(CANVAS_WIDTH + dummyEnemy.width);
        }

        if (getCollisionHitIndex([dummyCoin]) !== -1 || dummyCoin.getX() < 0) {
            dummyCoin = new Coin(CANVAS_WIDTH, CANVAS_HEIGHT, coinImage);
        }

        displayGameStartText();

        requestAnimationFrame(animate);
    }

    /**
     * Handles animation for cases when game has started 
     * 
     * @param {number} deltaTime is the difference in time between two animation frame 
     */
    function animateAfter(deltaTime) {

        background.update();
        background.draw(ctx);
        player.draw(ctx);
        player.update(input, deltaTime);

        displayStatusText();

        handleEnemies(deltaTime);
        handleCoins(deltaTime);
        handleSpeed(deltaTime);

        if (getCollisionHitIndex(enemies) !== -1) {
            gameOver = true;
            gameSound.pause();
            explosionSound.play();
        }

        gameOver && displayGameOverText();
        !gameOver && requestAnimationFrame(animate);
    }

    /**
     * Returns whether collision has happened between enemy and player or not
     * 
     * @param {array} enemies is an array of enemy
     */
    function getCollisionHitIndex(enemies) {

        return enemies.findIndex(enemy => {
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
     * Display game start text to the canvas
     */
    function displayGameStartText() {

        ctx.font = font.GAME_START_FONT;
        ctx.textAlign = align.CENTER;
        ctx.fillStyle = color.FILL_COLOR;
        ctx.fillText(START_GAME, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 80);
        ctx.strokeStyle = color.STROKE_COLOR;
        ctx.stroke();
    }

    /**
     * Display status text to the canvas
     */
    function displayStatusText() {

        ctx.font = font.SCORE_FONT;
        ctx.textAlign = align.LEFT;
        ctx.fillStyle = color.FILL_COLOR;
        ctx.fillText(SCORE + score, 20, 52);
        ctx.strokeStyle = color.STROKE_COLOR;
        ctx.stroke();
    }

    /**
     * Display Text For Game over
     */
    function displayGameOverText() {

        ctx.textAlign = align.CENTER;
        ctx.fillStyle = color.FILL_COLOR;
        ctx.fillText(GAME_OVER + score, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 100);
        ctx.fillText(GO_TO_START, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
        ctx.strokeStyle = color.STROKE_COLOR;
        ctx.stroke();
    }

    return {
        initialize,
        resetGame
    }

})();

slideScrollerModule.initialize();