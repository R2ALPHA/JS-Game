/**
 * Handles drawing of enemy object to canvas 
 */
function Enemy1() {

    // Calculate sprite width and sprite height to change the frame
    this.spriteWidth = 293;
    this.spriteHeight = 155;

    this.width = this.spriteWidth / 2.5;
    this.height = this.spriteHeight / 2.5;
    this.frame = 0;
    this.flapSpeed = Math.floor(Math.random() * 3 + 1);

    this.enemyImage = new Image();
    this.enemyImage.src = './resource/enemy1.png';

    // Place enemy randomly on creation 
    this.x = Math.round(Math.random() * (canvas.width - this.width));
    this.y = Math.round(Math.random() * (canvas.height - this.height));
}

/**
 * Update enemy coordinate 
 * 
 * @param {number} gameFrame is the current game frame, This is used to change sprite change speed.
 */
Enemy1.prototype.update = function (gameFrame) {

    // Randomly update position of the sprites
    this.x += Math.random() * 3 - 1.5;
    this.y += Math.random() * 3 - 1.5;

    // animate sprites 

    // Due to this we will be able to control switching speed for sprites
    if (gameFrame % this.flapSpeed === 0) {
        this.frame = this.frame > 4 ? 0 : this.frame + 1;
    }
}

/**
 * Draw enemy object onto canvas 
 * 
 * @param {CanvasRenderingContext2D} ctx is the canvas context object
 */
Enemy1.prototype.draw = function (ctx) {
    ctx.drawImage(this.enemyImage, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
}
