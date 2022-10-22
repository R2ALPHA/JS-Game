/**
 * Raven constructor 
 * 
 * @param {number} canvasWidth is the width of the canvas 
 * @param {*number} canvasHeight is the height of the canvas  
 */
function Raven(canvasWidth, canvasHeight) {

    // Sprite width and height
    this.spriteWidth = 271;
    this.spriteHeight = 194;

    // Randomly generate raven of different size (anything from -0.4 to 0.2)
    this.sizeModifier = Math.random() * 0.4 + 0.1;

    // The width and height of the image to draw
    this.width = this.spriteWidth * this.sizeModifier;
    this.height = this.spriteHeight * this.sizeModifier;

    // Current position of the raven (raven will move from right to left)
    this.x = canvasWidth
    this.y = Math.random() * (canvasHeight - this.height);

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

    // Generate a random color 
    this.randomColorArray = [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)
        , Math.floor(Math.random() * 255)];
    this.randomColor = 'rgb(' + this.randomColorArray.join(',') + ')';

    // Store canvas width and height 
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;

    // For 50% of the raven we will show trail
    this.hasTrail = Math.random() > 0.5;
    this.maxNumberOfParticle = 5;
}

/**
 * Update raven position 
 * 
 * @param {number} deltaTime is the time passed  
 */
Raven.prototype.update = function (deltaTime) {

    if (this.y < 0 || this.y > this.canvasHeight - this.height) {
        this.directionY = - this.directionY;
    }
    // Moving extreme left 
    this.x -= this.directionX;
    this.y += this.directionY;

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

        if (this.hasTrail) {
            for (let index = 0; index < this.maxNumberOfParticle; ++index) {
                pointAndShootModule.addParticle(new Particle(this.x + this.width / 2, this.y + this.height / 2, this.width, this.randomColor));
            }
        }
    }
}

/**
 * Draw raven object
 * 
 * @param {CanvasRenderingContext2D} ctx is canvas context
 * @param {CanvasRenderingContext2D} collisionCtx is canvas collison context
 */
Raven.prototype.draw = function (ctx, collisionCtx) {

    collisionCtx.fillStyle = this.randomColor;
    collisionCtx.fillRect(this.x, this.y, this.width, this.height);

    ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
}