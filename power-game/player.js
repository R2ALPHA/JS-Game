import { Diving, Falling, Jumping, Rolling, Running, Sitting, Hit, states } from "./state.js";
import { CollisionAnimation } from "./collisionAnimation.js";
import { FloatingMessage } from "./floatingMessages.js";

export default class Player {

    /**
     * Constructor 
     * 
     * @param {Game} game is the game object  
     */
    constructor(game) {

        this.game = game;
        this.width = 100;
        this.height = 91.3;
        this.x = 0;
        this.y = this.game.height - this.height - this.game.groundMargin;
        this.vy = 0;
        this.weight = 1;
        this.image = document.getElementById('player');
        this.frameX = 0;
        this.frameY = 0;
        this.speed = 4;
        this.maxSpeed = 10;
        this.maxFrame = 4;

        this.states = [
            new Sitting(this.game),
            new Running(this.game),
            new Jumping(this.game),
            new Falling(this.game),
            new Rolling(this.game),
            new Diving(this.game),
            new Hit(this.game)
        ];

        this.fps = 10;
        this.frameInterval = 1000 / this.fps;
        this.frameTimer = 0;
    }

    /**
     * Update player coordinate
     * 
     * @param {InputHandler} input is the input handler for the game 
     * @param {number} deltaTime is the time diff between previous and current frame 
     */
    update(input, deltaTime) {

        this.checkCollision();
        this.currentState.handleInput(input);

        // Horizontal Movement
        this.x += this.speed;
        this.setSpeed(input);

        // Horizontal boundaries
        this.x = this.x < 0 ? 0 : (this.x > this.game.width - this.width) ? this.game.width - this.width : this.x;

        // Vertical movement
        this.y += this.vy;

        // Vertical boundaries
        this.y = this.y > this.game.height - this.height - this.game.groundMargin ? this.game.height - this.height - this.game.groundMargin : this.y;

        this.handleSprites(deltaTime);
    }

    /**
     * Set player's speed based on type of input 
     * 
     * @param {InputHandler} input is the input handler object 
     */
    setSpeed(input) {

        if (input.isContainsKey(input.keyTypes.right) && !(this.currentState instanceof Hit)) {
            this.speed = this.maxSpeed;
        } else if (input.isContainsKey(input.keyTypes.left)) {
            this.speed = -this.maxSpeed;
        } else {
            this.speed = 0;
        }
    }

    /**
     * Set player's vertical speed 
     */
    setVerticalSpeed() {

        if (!this.onGround()) {
            this.vy += this.weight;
        } else {
            this.vy = 0;
        }
    }

    /**
     * Handle sprites 
     * 
     * @param {number} deltaTime is time diff between current and previous frame 
     */
    handleSprites(deltaTime) {

        if (this.frameTimer > this.frameInterval) {
            // Sprite animation
            this.frameX = this.frameX < this.maxFrame ? this.frameX + 1 : 0;
            this.frameTimer = 0;
        } else {
            this.frameTimer += deltaTime;
        }
    }

    /**
     * Draw player object to the canvas 
     * 
     * @param {CanvasRenderingContext2D} context is canvas context
     */
    draw(context) {

        // When in debug mode, draw player's boundary 
        if (this.game.debug) {
            context.strokeRect(this.x, this.y, this.width, this.height);
        }
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
    }

    /**
     * Returns whether player is on ground or not 
     */
    onGround() {
        return this.y >= this.game.height - this.height - this.game.groundMargin;
    }

    /**
     * Set player's current state 
     * 
     * @param {State} state is state of player
     * @param {number} speed is the game speed 
     */
    setState(state, speed) {

        this.currentState = this.states[state];
        this.game.speed = this.game.maxSpeed * speed;
        this.currentState.enter();
    }

    /**
     * Check collision 
     */
    checkCollision() {
        this.game.enemies.forEach(enemy => {
            if (this.isRectangleIntersect(enemy.x, enemy.y, enemy.width, enemy.height, this.x, this.y, this.width, this.height)) {
                enemy.markedForDeletion = true;
                if (this.currentState instanceof Rolling || this.currentState instanceof Diving) {
                    this.game.score++;
                    this.game.floatingMessages.push(new FloatingMessage('+1', enemy.x, enemy.y, 150, 100));
                    this.game.collisions.push(new CollisionAnimation(this.game, enemy.x + enemy.width * 0.5, enemy.y + enemy.height * 0.5));
                } else {
                    this.setState(states.HIT, 0);
                    this.game.lives--;
                    if (this.game.lives <= 0) {
                        this.game.gameOver = true;
                    }
                }
            }
        });
    }

    /**
     * Returns whether two rectangle intersects or not 
     */
    isRectangleIntersect(x, y, width, height, x1, y1, width1, height1) {
        return x < x1 + width1 && x + width > x1 && y < y1 + height1 && y + height > y1;
    }
}