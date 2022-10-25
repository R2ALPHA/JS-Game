class Background {

    /**
     * Constructor 
     * 
     * @param {number} gameWidth is usually canvas width
     * @param {number} gameHeight is usaually canvas height 
     * @param {Image} backgroundImage is the background image for the game
     */
    constructor(gameWidth, gameHeight, backgroundImage) {

        this.x = 0;
        this.y = 0;

        // Width and heigh are taken from sprites
        this.width = 2400;
        this.height = 720;
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.backgroundImage = backgroundImage;

        this.speed = 7;
    }

    /**
     * Update game background coordinates
     */
    update() {
        this.x -= this.speed;

        if (this.x < -this.width) {
            this.x = 0;
        }
    }

    /**
     * Draw background image to the canvas
     * 
     * @param {CanvasRenderingContext2D} context is the canvas context 
     */
    draw(context) {

        // We are drawing 2 background images, so that we can create an infinite scrolling here
        context.drawImage(this.backgroundImage, this.x, this.y, this.width, this.height);
        context.drawImage(this.backgroundImage, this.x + this.width, this.y, this.width, this.height);
    }
}