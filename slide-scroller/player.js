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

        this.maxFrame = 8; // Initially our player will be in the ground only 
        this.fps = 20;
        this.frameInterval = 1000 / this.fps;
        this.frameTimer = 0;

        // Radius of the imaginary circle we will be drawing for collision detection
        this.radius = this.width / 2 - this.width / 20;
    }

    /**
     * Draw player object to the canvas
     * 
     * @param {CanvasRenderingContext2D} context is canvas context
     */
    draw(context) {

        context.strokeStyle = 'white';
        context.beginPath();
        context.arc(this.x + this.width / 2, this.y + this.height / 2, this.radius, 0, Math.PI * 2);
        context.stroke();
        context.fillStyle = 'white';
        context.drawImage(this.playerImage, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
    }

    /**
     * Update player coordinate and speed 
     * 
     * @param {InputHandler} input is the input handler object 
     * @param {number} deltaTime is the time interval between 2 request animation frame 
     */
    update(input, deltaTime) {

        this.setHorizontalSpeed(input);
        this.setVerticalSpeed(input);
        this.spriteAnimation(deltaTime);

        this.x += this.speed;
        this.y += this.vy;

        if (this.x + this.width > this.gameWidth) {
            this.x = this.gameWidth - this.width;
        } else if (this.x < 0) {
            this.x = 0;
        }
    }

    /**
     * Handles sprite animation of player
     * 
     * @param {number} deltaTime is the time interval between request frames
     */
    spriteAnimation(deltaTime) {

        if (this.frameTimer > this.frameInterval) {
            this.frameX = this.frameX >= this.maxFrame ? 0 : this.frameX + 1;
            this.frameTimer = 0;
        } else {
            this.frameTimer += deltaTime;
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
            this.frameY = 1;
            this.maxFrame = 6;
        } else if (!this.isPlayerOnGround()) {
            this.vy += this.weight;
        } else {
            this.vy = 0;
            this.frameY = 0;
            this.maxFrame = 8;
        }
    }

    /**
     * Returns whether player is on ground or not
     */
    isPlayerOnGround() {
        return this.y >= this.gameHeight - this.height;
    }
}