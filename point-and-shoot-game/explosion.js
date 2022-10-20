/**
 * Draw explosion when object is hit 
 * 
 * @param {number} x is the x coordinate (mouse)  
 * @param {number} y is the y coordinate (mouse)
 * @param {number} size is raven size  
 */
function Explosion(x, y, size) {

    this.x = x;
    this.y = y;
    this.size = size;
    this.spriteWidth = 200;
    this.spriteHeight = 179;

    this.image = new Image();
    this.image.src = './resource/boom.png';

    this.sound = new Audio();
    this.sound.src = './resource/boom.wav';

    this.frame = 0;
    this.timeSinceLastFrame = 0;
    this.frameInterval = 200;
    this.markForDeletion = false;
}

/**
 * Update explosion frame 
 * 
 * @param {number} deltaTime is the delta time that has passed 
 */
Explosion.prototype.update = function (deltaTime) {

    this.timeSinceLastFrame += deltaTime;

    if (this.frame === 0) {
        this.sound.play();
    } else if (this.frame === 5) {
        this.markForDeletion = true;
    }

    if (this.timeSinceLastFrame > this.frameInterval) {
        this.frame++;
        this.timeSinceLastFrame = 0;
    }
}

/**
 * Draw explosion frame
 * 
 * @param {CanvasRenderingContext2D} ctx is the canvas context 
 */
Explosion.prototype.draw = function (ctx) {
    ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y - this.size / 4, this.size, this.size);
}