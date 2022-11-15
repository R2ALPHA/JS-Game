import InputHandler from './input.js';
import Player from './player.js';
import { Background } from './background.js';
import { ClimbingEnemy, FlyingEnemy, GroundEnemy } from './enemies.js';
import { UI } from './UI.js';

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
            this.groundMargin = 80;
            this.speed = 0;
            this.maxSpeed = 6;
            this.background = new Background(this);
            this.player = new Player(this);
            this.input = new InputHandler(this);
            this.UI = new UI(this);
            this.enemies = [];
            this.enemyTimer = 0;
            this.enemyInterval = 1000;
            this.score = 0;
        }

        update(deltaTime) {

            this.background.update();
            this.player.update(this.input, deltaTime);
            // Handle enemies 
            if (this.enemyTimer > this.enemyInterval) {

                this.addEnemy();
                this.enemyTimer = 0;
            } else {
                this.enemyTimer += deltaTime;
            }

            this.enemies.forEach(enemy => {
                enemy.update(deltaTime);
                if (enemy.markedForDeletion) {
                    this.enemies.splice(this.enemies.indexOf(enemy), 1);
                }
            });
        }

        draw(context) {

            this.background.draw(context);
            this.player.draw(context);
            this.enemies.forEach(enemy => {
                enemy.draw(ctx);
            });
            this.UI.draw(ctx);
        }

        addEnemy() {
            if (this.speed > 0 && Math.random() < 0.5) {
                this.enemies.push(new GroundEnemy(this));
            } else if (this.speed > 0) {
                this.enemies.push(new ClimbingEnemy(this));
            }
            this.enemies.push(new FlyingEnemy(this));
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