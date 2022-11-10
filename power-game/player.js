import { Falling, Jumping, Running, Sitting } from "./state.js";
export default class Player {

    constructor(game) {

        this.game = game;
        this.width = 100;
        this.height = 91.3;
        this.x = 0;
        this.y = this.game.height - this.height;
        this.vy = 0;
        this.weight = 1;
        this.image = document.getElementById('player');
        this.frameX = 0;
        this.frameY = 0;
        this.speed = 0;
        this.maxSpeed = 10;
        this.maxFrame = 4;

        this.states = [new Sitting(this), new Running(this), new Jumping(this), new Falling(this)];
        this.currentState = this.states[0];
        this.currentState.enter();

        this.fps = 10;
        this.frameInterval = 1000 / this.fps;
        console.log("The frame interval is", this.frameInterval);
        this.frameTimer = 0;
    }

    /**
     * 
     * @param {InputHandler} input is the input handler for the game 
     */
    update(input, deltaTime) {

        this.currentState.handleInput(input);

        this.x += this.speed;
        if (input.isContainsKey(input.keyTypes.right)) {
            this.speed = this.maxSpeed;
        } else if (input.isContainsKey(input.keyTypes.left)) {
            this.speed = -this.maxSpeed;
        } else {
            this.speed = 0;
        }

        this.x = this.x < 0 ? 0 : (this.x > this.game.width - this.width) ? this.game.width - this.width : this.x;

        this.y += this.vy;

        if (!this.onGround()) {
            this.vy += this.weight;
        } else {
            this.vy = 0;
        }

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
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
    }

    onGround() {
        return this.y >= this.game.height - this.height;
    }

    setState(state) {

        this.currentState = this.states[state];
        this.currentState.enter();
    }

}