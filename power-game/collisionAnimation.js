export class CollisionAnimation {

    /**
     * Constructor 
     * 
     * @param {Game} game is the game object 
     * @param {number} x is the player x coordinate
     * @param {number} y is the player y coordinate
     */
    constructor(game, x, y) {

        this.game = game;
        this.image = document.getElementById('collisionAnimation');
        this.spriteWidth = 100;
        this.spriteHeight = 90;
        this.sizeModifier = Math.random() + 0.5;
        this.width = this.spriteWidth * this.sizeModifier;
        this.height = this.spriteHeight * this.sizeModifier;
        this.x = x - this.width * 0.5;
        this.y = y - this.height * 0.5;
        this.frameX = 0;
        this.maxFrame = 4;
        this.markedForDeletion = false;
        this.fps = Math.random() * 10 + 5;
        this.frameInterval = 1000 / this.fps;
        this.frameTimer = 0;
    }

    /**
     * Draw collision object to the canvas
     * 
     * @param {CanvasRenderingContext2D} context is canvas rendering context  
     */
    draw(context) {
        context.drawImage(this.image, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }

    /**
     * Update collision coordinate 
     * 
     * @param {number} deltaTime is time difference between the previous and current frame 
     */
    update(deltaTime) {

        this.x -= this.game.speed;
        if (this.frameTimer > this.frameInterval) {
            this.frameX++;
            this.frameTimer = 0;
        } else {
            this.frameTimer += deltaTime;
        }
        if (this.frameX > this.maxFrame) {
            this.markedForDeletion = true;
        }
    }
}