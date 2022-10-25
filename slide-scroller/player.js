class Player {

    /**
     * Constructor 
     * 
     * @param {number} gameWidth is ideally canvas width 
     * @param {number} gameHeight is ideally canvas height
     * @param {Image} playerImage is player image  
     */
    constructor(gameWidth, gameHeight, playerImage) {

        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.width = 200;
        this.height = 200;
        this.x = 0;
        this.y = this.gameHeight - this.height;
        this.playerImage = playerImage;
        this.frameX = 0;
        this.frameY = 0;
        this.speed = 5;
        this.vy = 0;
        this.weight = 1;
    }

    /**
     * Draw player object to the canvas
     * 
     * @param {CanvasRenderingContext2D} context is canvas context
     */
    draw(context) {

        context.fillStyle = 'white';
        context.drawImage(this.playerImage, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
    }

    /**
     * Update player coordinate and speed 
     * 
     * @param {InputHandler} input is the input handler object 
     */
    update(input) {

        this.setHorizontalSpeed(input);
        this.setVerticalSpeed(input);

        this.x += this.speed;
        this.y += this.vy;

        if (this.x + this.width > this.gameWidth) {
            this.x = this.gameWidth - this.width;
        } else if (this.x < 0) {
            this.x = 0;
        }
    }

    /**
     * Set Horizontal speed for player 
     * 
     * @param {InputHandler} input is the input handler object 
     */
    setHorizontalSpeed(input) {

        if (input.isContainsKey(input.arrowType.right)) {
            this.speed = 5;
        } else if (input.isContainsKey(input.arrowType.left)) {
            this.speed = -5;
        } else {
            this.speed = 0;
        }
    }

    /**
     * Set vertical speed for player
     * 
     * @param {InputHandler} input is the input handler object 
     */
    setVerticalSpeed(input) {

        if (input.isContainsKey(input.arrowType.up) && this.isPlayerOnGround()) {
            this.vy = -32;
        } else if (!this.isPlayerOnGround()) {
            this.vy += this.weight;
        } else {
            this.vy = 0;
        }
    }

    /**
     * Returns whether player is on ground or not
     */
    isPlayerOnGround() {
        return this.y >= this.gameHeight - this.height;
    }
}