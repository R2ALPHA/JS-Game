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
        this.speed = 1;
    }

    /**
     * Update enemy position/coordinate
     */
    update() {
        this.x--;
    }

    /**
     * Draw enemy object to canvas
     * 
     * @param {CanvasRenderingContext2D} context is the canvas context 
     */
    draw(context) {
        context.drawImage(this.enemyImage, this.frameX * this.width, 0, this.width, this.height, this.x, this.y, this.width, this.height);
    }
}