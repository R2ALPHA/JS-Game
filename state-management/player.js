import { SittingLeft, SittingRight, StandingLeft, StandingRight } from "./state.js";

/**
 * Player class 
 */
export default class Player {
    constructor(gameWidth, gameHeight, image) {

        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.states = [new StandingLeft(this), new StandingRight(this), new SittingLeft(this), new SittingRight(this)];
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
}