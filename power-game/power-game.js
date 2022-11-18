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
            this.particles = [];
            this.collisions = [];
            this.enemyTimer = 0;
            this.enemyInterval = 1000;
            this.score = 0;
            this.maxParticles = 200;
            this.debug = false;
            this.time = 0;
            this.maxTime = 200000;
            this.player.currentState = this.player.states[0];
            this.player.currentState.enter();
        }

        update(deltaTime) {

            this.time += deltaTime;
            if (this.time > this.maxTime) {
                this.gameOver = true;
            }
            this.background.update();
            this.player.update(this.input, deltaTime);
            // Handle enemies 
            if (this.enemyTimer > this.enemyInterval) {

                this.addEnemy();
                this.enemyTimer = 0;
            } else {
                this.enemyTimer += deltaTime;
            }

            this.enemies.forEach((enemy, index) => {
                enemy.update(deltaTime);
                if (enemy.markedForDeletion) {
                    this.enemies.splice(index, 1);
                }
            });

            // Handle particles
            this.particles.forEach((particle, index) => {
                particle.update();
                if (particle.markedForDeletion) {
                    this.particles.splice(index, 1);
                }
            });
            if (this.particles.length > this.maxParticles) {
                this.particles = this.particles.slice(0, this.maxParticles);
            }

            // Handle collision sprites
            this.collisions.forEach((collision, index) => {
                collision.update(deltaTime);
                if (collision.markedForDeletion) {
                    this.collisions.splice(index, 1);
                }
            });
        }

        draw(context) {

            this.background.draw(context);
            this.player.draw(context);
            this.enemies.forEach(enemy => {
                enemy.draw(context);
            });
            this.particles.forEach(particle => {
                particle.draw(context);
            });
            this.collisions.forEach(collision => {
                collision.draw(context);
            });
            this.UI.draw(context);
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
        !game.gameOver && requestAnimationFrame(animate);
    }

    function clearCanvas() {
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }

    animate(0);
});