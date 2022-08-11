/**
 * Draw layer for parallex background 
 * 
 * @param {object} image is the image object 
 * @param {number} speedModifier is the speed by which we need to move layer 
 */
function Layer(image, speedModifier) {

    this.x = 0;
    this.y = 0;

    // Our image width is 2400px. If frame drop happens we might need change the width of the image
    this.width = 2400;
    this.height = 700;

    this.image = image;
    this.speedModifier = speedModifier;
    this.speed = speedModifier; // origianlly game speed * speedModifier
}

/**
 * Draw layer contineosuly 
 * 
 * @param {CanvasRenderingContext2D} ctx is the canvas context object  
 */
Layer.prototype.draw = function (ctx) {

    // Why we are drawing two image?
    // We are covering 4800 (2400 * 2) px at a time, so that the transition will be smooth 
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
}

/**
 * Update position of layer to give parallax effect
 * 
 * @param {number} gameSpeed is the current game speed
 */
Layer.prototype.update = function (gameSpeed) {

    // Our actual speed is gameSpeed of application times the speed modifier 
    this.speed = gameSpeed * this.speedModifier;

    // Since we are moving from left to right, so when we reach the left extrema we need to reset
    if (this.x <= -this.width) {
        this.x = 0;
    }

    // Calculate the distance need to traverse
    this.x = Math.floor(this.x - this.speed);
};

/**
 * Draw and update layer position 
 * 
 * @param {CanvasRenderingContext2D} ctx is the canvas context 
 * @param {number} gameSpeed is the game speed for the application 
 */
Layer.prototype.drawAndUpdateLayerPosition = function (ctx, gameSpeed) {

    // First we need to update the layer position
    this.update(gameSpeed);

    this.draw(ctx);
}
