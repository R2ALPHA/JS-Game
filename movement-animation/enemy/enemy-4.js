/**
 * Handles drawing of enemy object to canvas 
 */
function Enemy4() {

    // Calculate sprite width and sprite height to change the frame
    this.spriteWidth = 213;
    this.spriteHeight = 213;

    this.speed = Math.random() * 4 + 1;

    this.width = this.spriteWidth / 2.5;
    this.height = this.spriteHeight / 2.5;
    this.frame = 0;
    this.flapSpeed = Math.floor(Math.random() * 3 + 1);

    this.enemyImage = new Image();
    this.enemyImage.src = './resource/enemy4.png';

    // Place enemy randomly on creation 
    this.x = Math.round(Math.random() * (canvas.width - this.width));
    this.y = Math.round(Math.random() * (canvas.height - this.height));

    this.newX = Math.round(Math.random() * canvas.width - this.width);
    this.newY = Math.round(Math.random() * canvas.height - this.height);

    this.interval = Math.floor(Math.random() * 200 + 50);
}

/**
 * Update enemy coordinate 
 * 
 * @param {number} gameFrame is the current game frame, This is used to change sprite change speed.
 * @param {CanvasRenderingContext2D} ctx is the game context 2d object
 */
Enemy4.prototype.update = function (gameFrame, ctx) {

    // Every 60 frame, we will randomly generate a new position x and y. 
    if (gameFrame % this.interval === 0) {
        this.newX = Math.random() * (canvas.width - this.width);
        this.newY = Math.random() * (canvas.height - this.height);
    }

    // The actual distance to shift 
    let dx = this.x - this.newX;
    let dy = this.y - this.newY;

    // we will cover only one -twentith of a distance at a time
    this.x -= dx / 20;
    this.y -= dy / 20;

    // We can much better check then but let it be for now 
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
Enemy4.prototype.draw = function (ctx) {
    ctx.drawImage(this.enemyImage, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
}
