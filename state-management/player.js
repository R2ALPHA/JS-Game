import { JumpingLeft, JumpingRight, RunningLeft, RunningRight, SittingLeft, SittingRight, StandingLeft, StandingRight } from "./state.js";

/**
 * Player class 
 */
export default class Player {
    constructor(gameWidth, gameHeight, image) {

        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.states = [new StandingLeft(this), new StandingRight(this), new SittingLeft(this), new SittingRight(this), new RunningLeft(this), new RunningRight(this), new JumpingLeft(this), new JumpingRight(this)];
        // By default our player is standing toward right
        this.currentState = this.states[1];
        this.image = image;
        // The width and height is calculated from the sprites
        this.width = 200;
        this.height = 181.83;
        // Place the player to canvas bottom-center
        this.x = this.gameWidth / 2 - this.width / 2;
        this.y = this.gameHeight - this.height;
        // Track frame to show
        this.frameX = 0;
        this.frameY = 0;
        this.speed = 0;
        this.maxSpeed = 10;
        this.vy = 0;
        this.weight = 0.5;
    }

    /**
     * Draw player object 
     * 
     * @param {CanvasRenderingContext2D} context is the canvas context
     */
    draw(context) {
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
    }

    /**
     * Handle input for player
     * 
     * @param {string} inputKey is pressed state key 
     */
    update(inputKey) {

        this.currentState.handleInput(inputKey);
        this.x += this.speed;
        this.y += this.vy;

        // Boundary 
        this.x = this.x < 0 ? 0 : (this.x >= this.gameWidth - this.width) ? this.gameWidth - this.width : this.x;
        this.vy += !this.onGround() ? this.weight : -this.vy;
        this.y = this.y > this.gameHeight - this.height ? this.gameHeight - this.height : this.y;
    }

    /**
     * Set player state 
     * 
     * @param {number} state is the current state of player
     */
    setState(state) {

        this.currentState = this.states[state];
        this.currentState.enter();
    }

    onGround() {
        return this.y >= this.gameHeight - this.height;
    }
}