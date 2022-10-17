/**
 * Raven constructor 
 */
function Raven() {

    // Sprite width and height
    this.spriteWidth = 271;
    this.spriteHeight = 194;

    // Randomly generate raven of different size (anything from -0.4 to 0.2)
    this.sizeModifier = Math.random() * 0.6 - 0.4;

    // The width and height of the image to draw
    this.width = this.spriteWidth * this.sizeModifier;
    this.height = this.spriteHeight * this.sizeModifier;

    // Current position of the raven (raven will move from right to left)
    this.x = canvas.width;
    this.y = Math.random() * (canvas.height - this.height);

    // The distance it will cover in each frame
    this.directionX = Math.random() * 5 + 3; // Anything from 3 to 8
    this.directionY = Math.random() * 5 - 2.5; // Anything from -2.5 to 2.5

    // Once raven cross the canvas (moved extreme left, we need to mark the raven for deletion)
    this.markedForDeletion = false;

    // Create image object to store raven 
    this.image = new Image();
    this.image.src = './resource/raven.png';

    this.frame = 0;
    this.maxFrame = 4;
    this.timeSinceFlap = 0;
    this.flapInterval = 100;
}

/**
 * Update raven position 
 * 
 * @param {number} deltaTime is the time passed  
 */
Raven.prototype.update = function (deltaTime) {

    // Moving extreme left 
    this.x -= this.directionX;
    this.y -= this.directionY;

    // if crossed the extreme left postion, mark it for deletion
    if (this.x < -this.width) {
        this.markedForDeletion = true;
    }

    this.timeSinceFlap += deltaTime;

    // We will be controlling our frame rate here
    // When we reach flap interval then only render the next frame. Based on delta time some raven will flap faster some will flap slow
    if (this.timeSinceFlap > this.flapInterval) {

        // If we have renderd all the frame, restart the frame
        if (this.frame > this.maxFrame) {
            this.frame = 0
        } else {
            this.frame += 1;
        }

        // Reset timesice flap
        this.timeSinceFlap = 0;
    }
}

/**
 * Draw raven object
 * 
 * @param {CanvasRenderingContext2D} ctx is canvas context
 */
Raven.prototype.draw = function (ctx) {
    ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
}