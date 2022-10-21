/**
 * Particle constructor 
 * 
 * @param {number} x is the startX coordinate for particle 
 * @param {number} y is the startY coordinat for particle
 * @param {number} size is the size of the raven 
 * @param {string} color is the hit box color of the raven
 */
function Particle(x, y, size, color) {

    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    // this.markForDeletion = false;
    this.speed = Math.random() * 1 + 0.5;
    this.radius = Math.random() * this.size / 20;
    this.maxRadius = Math.random() * 20;
}

/**
 * Update particle coordinates
 */
Particle.prototype.update = function () {

    this.x += this.speed;
    this.radius += 0.2;
    // if (this.radius > this.maxRadius) {
    //     this.markForDeletion = true;
    // }
}

/**
 * Draw particle object 
 * 
 * @param {CanvasRenderingContext2D} ctx is the canvas context 
 */
Particle.prototype.draw = function (ctx) {

    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
}