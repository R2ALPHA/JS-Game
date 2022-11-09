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
    }

    /**
     * 
     * @param {InputHandler} input is the input handler for the game 
     */
    update(input) {

        this.x += this.speed;
        if (input.isContainsKey(input.keyTypes.right)) {
            this.speed = this.maxSpeed;
        } else if (input.isContainsKey(input.keyTypes.left)) {
            this.speed = -this.maxSpeed;
        } else {
            this.speed = 0;
        }

        this.x = this.x < 0 ? 0 : (this.x > this.game.width - this.width) ? this.game.width - this.width : this.x;

        if (input.isContainsKey(input.keyTypes.up) && this.onGround()) {
            this.vy -= 30;
        }
        this.y += this.vy;

        if (!this.onGround()) {
            this.vy += this.weight;
        } else {
            this.vy = 0;
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

}