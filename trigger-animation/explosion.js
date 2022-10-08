/**
 * Handles explosion of the objects
 * 
 * @param {number} x is the x coordinate for explosion
 * @param {number} y is the y cooridnate for explosion
 */
function Explosion(x, y) {

    this.spriteWidth = 200;
    this.spriteHeight = 179;
    this.width = this.spriteWidth / 2;
    this.height = this.spriteHeight / 2;
    this.x = x;
    this.y = y;
    this.image = new Image();
    this.image.src = './resource/boom.png';
    this.frame = 0;
    this.timer = 0;
    this.angle = Math.random() * 6.2;
    this.sound = new Audio();
    this.sound.src = './resource/boom.wav';
}

/**
 * Update frame and timer
 */
Explosion.prototype.update = function () {

    // When frame is 0, play the sound
    if (this.frame === 0) {
        this.sound.play();
    }

    // Increase the timer 
    this.timer++;

    // Increase the frame after every 10 increment of timer
    if (this.timer % 10 === 0) {
        this.frame++;
    }
}

/**
 * Draw the explosion onto canvas 
 */
Explosion.prototype.draw = function (ctx) {

    // Save the canvas state into a stack 
    ctx.save();
    ctx.translate(this.x, this.y);

    // Rotate the explosion
    ctx.rotate(this.angle);
    ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, 0 - this.width / 2, 0 - this.height / 2, this.width, this.height);

    // Restore the canvas state into a stack
    ctx.restore();
}
