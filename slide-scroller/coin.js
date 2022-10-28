class Coin {

    /**
     * Constructor
     * 
     * @param {number} gameWidth is width of playing area 
     * @param {number} gameHeight is height of playing area
     * @param {Image} coinImage is the coin image 
     */
    constructor(gameWidth, gameHeight, coinImage) {

        this.spriteWidth = 563;
        this.spriteHeight = 573;

        this.width = this.spriteWidth / 10;
        this.height = this.spriteHeight / 10;
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.coinImage = coinImage;

        this.x = gameWidth + Math.random();
        this.y = Math.random() * (gameHeight - this.height);

        this.maxFrame = 30;
        this.frameX = 0;
        this.frameY = this.maxFrame - 1;

        this.radius = this.width / 2;
        this.markForDeletion = false;
        this.speed = 10;

        this.fps = 10;
        this.frameInterval = 1000 / this.fps;
        this.frameTimer = 0;
    }

    /**
     * Update enemy position/coordinate
     * 
     * @param {number} deltaTime is the delta time between two request animation frame loop
     */
    update(deltaTime) {

        this.spriteAnimation(deltaTime);

        this.x -= this.speed;

        if (this.x < -this.width) {
            this.markForDeletion = true;
        }
    }

    /**
     * Handles sprite animation of player
     * 
     * @param {number} deltaTime is the time interval between request frames
     */
    spriteAnimation(deltaTime) {

        if (this.frameTimer > this.frameInterval) {
            this.frameY = this.frameY == 0 ? this.maxFrame - 1 : this.frameY - 1;
            this.frameTimer = 0;
        } else {
            this.frameTimer += deltaTime;
        }
    }

    /**
     * Draw enemy object to canvas
     * 
     * @param {CanvasRenderingContext2D} context is the canvas context 
     */
    draw(context) {

        context.strokeStyle = 'white';
        context.drawImage(this.coinImage, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight + 15, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }

    /**
     * Returns x coordinate of coin
     */
    getX() {
        return this.x;
    }

    /**
     * Returns y coordinate of coin
     */
    getY() {
        return this.y;
    }

    /**
     * Increase coin speed 
     * 
     * @param {number} deltaSpeed is speed to add 
     */
    increaseSpeed(deltaSpeed = null) {
        this.speed += deltaSpeed != null ? deltaSpeed : Math.random() + 1;
    }
}