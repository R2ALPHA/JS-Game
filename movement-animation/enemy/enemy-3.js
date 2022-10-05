/**
 * Handles drawing of enemy object to canvas 
 */
function Enemy3() {

    // Calculate sprite width and sprite height to change the frame
    this.spriteWidth = 218;
    this.spriteHeight = 177;

    this.speed = Math.random() * 4 + 1;

    this.width = this.spriteWidth / 2.5;
    this.height = this.spriteHeight / 2.5;
    this.frame = 0;
    this.flapSpeed = Math.floor(Math.random() * 3 + 1);

    this.enemyImage = new Image();
    this.enemyImage.src = './resource/enemy3.png';

    // Place enemy randomly on creation 
    this.x = Math.round(Math.random() * (canvas.width - this.width));
    this.y = Math.round(Math.random() * (canvas.height - this.height));

    this.angle = Math.random() * 500;;
    this.angleSpeed = Math.random() * 0.5 + 0.5;
}

/**
 * Update enemy coordinate 
 * 
 * @param {number} gameFrame is the current game frame, This is used to change sprite change speed.
 * @param {CanvasRenderingContext2D} ctx is the game context 2d object
 */
Enemy3.prototype.update = function (gameFrame, ctx) {

    this.x = canvas.width / 2 * Math.sin(this.angle * Math.PI / 90) + (ctx.canvas.width / 2 - this.width / 2);
    this.y = canvas.height / 2 * Math.cos(this.angle * Math.PI / 450) + (ctx.canvas.height / 2 - this.height / 2);
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
Enemy3.prototype.draw = function (ctx) {
    ctx.drawImage(this.enemyImage, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
}
