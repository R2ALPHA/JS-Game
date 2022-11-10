import InputHandler from './input.js';
import Player from './player.js';

window.addEventListener('load', () => {

    const canvas = document.getElementById('canvas1');

    const ctx = canvas.getContext('2d');
    const CANVAS_WIDTH = canvas.width = 500;
    const CANVAS_HEIGHT = canvas.height = 500;
    let lastTime = 0;

    class Game {
        constructor(width, height) {

            this.width = width;
            this.height = height;
            this.player = new Player(this);
            this.input = new InputHandler(this);
        }

        update(deltaTime) {
            this.player.update(this.input, deltaTime);
        }

        draw(context) {
            this.player.draw(context);
        }
    }

    const game = new Game(CANVAS_WIDTH, CANVAS_HEIGHT);

    function animate(timeStamp) {

        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;

        clearCanvas();
        game.update(deltaTime);
        game.draw(ctx);
        requestAnimationFrame(animate);
    }

    function clearCanvas() {
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }

    animate(0);
});