const canvas = document.getElementById('canvas');
canvas.style.cursor = 'pointer';
const ctx = canvas.getContext('2d');

let explosions = [];
let canvasPositions = canvas.getBoundingClientRect();
let dpr = window.devicePixelRatio;

canvas.width = 500 * dpr;
canvas.height = 700 * dpr;

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
    console.log("the sound variable is ", this.sound);
}

Explosion.prototype.update = function () {

    if (this.frame === 0) {
        this.sound.play();
    }

    this.timer++;

    if (this.timer % 10 === 0) {
        this.frame++;
    }
}

Explosion.prototype.draw = function () {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, 0 - this.width / 2, 0 - this.height / 2, this.width, this.height);
    ctx.restore();
}

window.addEventListener('click', (e) => createAnimation(e));
// window.addEventListener('mousemove', (e) => createAnimation(e))

function createAnimation(event) {
    let positionX = (event.x - canvasPositions.left) * dpr;
    let positionY = (event.y - canvasPositions.top) * dpr;
    explosions.push(new Explosion(positionX, positionY));
}

function draw() {

    explosions.forEach(explosion => {

        explosion.update();
        explosion.draw();
    });

    explosions = explosions.filter(explosion => explosion.frame <= 5);
}

function animate() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw();
    requestAnimationFrame(animate);
}

animate();