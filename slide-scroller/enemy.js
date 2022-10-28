class Enemy {

    /**
     * Constructor 
     * 
     * @param {number} gameWidth is usually canvas width 
     * @param {number} gameHeight is usually canvas height 
     * @param {Image} enemyImage is the enemy image  
     */
    constructor(gameWidth, gameHeight, enemyImage) {

        this.width = 160;
        this.height = 119;
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.enemyImage = enemyImage;
        this.x = this.gameWidth;
        this.y = this.gameHeight - this.height;
        this.frameX = 0;
        this.speed = 8;
        this.maxFrame = 5;
        this.fps = 20;
        this.frameInterval = 1000 / this.fps;
        this.frameTimer = 0;
        this.markForDeletion = false;
        this.radius = this.width / 2 - this.width / 20;
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
            this.frameX = this.frameX >= this.maxFrame ? 0 : this.frameX + 1;
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
        context.drawImage(this.enemyImage, this.frameX * this.width, 0, this.width, this.height, this.x, this.y, this.width, this.height);
    }

    /**
     * Set enemy x coordinate
     * 
     * @param {number} xPos is the x coordinate  
     */
    setX(xPos) {
        this.x = xPos;
    }

    /**
     * Returns x coordinate
     */
    getX() {
        return this.x;
    }

    /**
     * Set enemy y coordinate
     * 
     * @param {number} yPos is the coordinate along y axis where we need to place enemy 
     */
    setY(yPos) {
        this.yPos = yPos;
    }

    /**
     * Returns y coordinate
     */
    getY() {
        return this.y;
    }

    /**
     * Increase enemy speed 
     * 
     * @param {number} deltaSpeed is speed to add 
     */
    increaseSpeed(deltaSpeed = null) {
        this.speed += deltaSpeed != null ? deltaSpeed : Math.random() + 1;
    }
}