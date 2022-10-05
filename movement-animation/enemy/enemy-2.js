/**
 * Handles drawing of enemy object to canvas 
 */
function Enemy2() {

    // Calculate sprite width and sprite height to change the frame
    this.spriteWidth = 266;
    this.spriteHeight = 188;

    this.speed = Math.random() * 4 + 1;

    this.width = this.spriteWidth / 2.5;
    this.height = this.spriteHeight / 2.5;
    this.frame = 0;
    this.flapSpeed = Math.floor(Math.random() * 3 + 1);

    this.enemyImage = new Image();
    this.enemyImage.src = './resource/enemy2.png';

    // Place enemy randomly on creation 
    this.x = Math.round(Math.random() * (canvas.width - this.width));
    this.y = Math.round(Math.random() * (canvas.height - this.height));

    this.angle = 0;
    this.angleSpeed = Math.random() * 0.2;
    this.curve = Math.random() * 7;
}

/**
 * Update enemy coordinate 
 * 
 * @param {number} gameFrame is the current game frame, This is used to change sprite change speed.
 * @param {CanvasRenderingContext2D} ctx is the game context 2d object
 */
Enemy2.prototype.update = function (gameFrame, ctx) {

    this.x -= this.speed;
    this.y += this.curve * Math.sin(this.angle);
    this.angle += this.angleSpeed;

    if (this.x + this.width < 0) {
        this.x = ctx.canvas.width;
    }

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
Enemy2.prototype.draw = function (ctx) {
    ctx.drawImage(this.enemyImage, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
}
