import { Diving, Falling, Jumping, Rolling, Running, Sitting } from "./state.js";
export default class Player {

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
            new Diving(this.game)
        ];

        this.fps = 10;
        this.frameInterval = 1000 / this.fps;
        this.frameTimer = 0;
    }

    /**
     * 
     * @param {InputHandler} input is the input handler for the game 
     */
    update(input, deltaTime) {

        this.checkCollision();
        this.currentState.handleInput(input);

        // Horizontal Movement
        this.x += this.speed;
        if (input.isContainsKey(input.keyTypes.right)) {
            this.speed = this.maxSpeed;
        } else if (input.isContainsKey(input.keyTypes.left)) {
            this.speed = -this.maxSpeed;
        } else {
            this.speed = 0;
        }

        // Horizontal boundaries
        this.x = this.x < 0 ? 0 : (this.x > this.game.width - this.width) ? this.game.width - this.width : this.x;

        // Vertical movement
        this.y += this.vy;

        if (!this.onGround()) {
            this.vy += this.weight;
        } else {
            this.vy = 0;
        }

        // Vertical boundaries
        this.y = this.y > this.game.height - this.height - this.game.groundMargin ? this.game.height - this.height - this.game.groundMargin : this.y;
        if (this.frameTimer > this.frameInterval) {
            // Sprite animation
            this.frameX = this.frameX < this.maxFrame ? this.frameX + 1 : 0;
            this.frameTimer = 0;
        } else {
            this.frameTimer += deltaTime;
        }
    }

    /**
     * 
     * Draw player object to the canvas 
     * 
     * @param {CanvasRenderingContext2D} context is canvas context
     */
    draw(context) {

        if (this.game.debug) {
            context.strokeRect(this.x, this.y, this.width, this.height);
        }
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
    }

    onGround() {
        return this.y >= this.game.height - this.height - this.game.groundMargin;
    }

    setState(state, speed) {

        this.currentState = this.states[state];
        this.game.speed = this.game.maxSpeed * speed;
        this.currentState.enter();
    }

    checkCollision() {
        this.game.enemies.forEach(enemy => {
            if (
                enemy.x < this.x + this.width &&
                enemy.x + enemy.width > this.x &&
                enemy.y < this.y + this.height &&
                enemy.y + enemy.height > this.y
            ) {
                enemy.markedForDeletion = true;
                this.game.score++;
            } else {
                // no collision detected
            }
        });
    }
}