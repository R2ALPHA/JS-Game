/**
 * Particle constructor 
 * 
 * @param {number} x is the startX coordinate for particle 
 * @param {number} y is the startY coordinat for particle
 * @param {number} size is the size of the raven 
 * @param {string} color is the hit box color of the raven
 */
function Particle(x, y, size, color) {

    this.size = size;
    this.x = x + this.size / 2;
    this.y = y
    this.color = color;
    this.markedForDeletion = false;
    this.speed = Math.random() * 1 + 0.5;
    this.radius = Math.random() * this.size / 20;
    this.maxRadius = Math.random() * 20 + 20;
    this.radiusIncreaseBy = 0.3;
}

/**
 * Update particle coordinates
 */
Particle.prototype.update = function () {

    this.x += this.speed;
    this.radius += this.radiusIncreaseBy;
    if (this.radius > this.maxRadius - 5) {
        this.markedForDeletion = true;
    }
}

/**
 * Draw particle object 
 * 
 * @param {CanvasRenderingContext2D} ctx is the canvas context 
 */
Particle.prototype.draw = function (ctx) {

    ctx.save();
    ctx.globalAlpha = 1 - this.radius / this.maxRadius;
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();
}