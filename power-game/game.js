import InputHandler from './inputHandler.js';
import Player from './player.js';
import { Background } from './background.js';
import { ClimbingEnemy, FlyingEnemy, GroundEnemy } from './enemies.js';
import { UI } from './UI.js';

export default class Game {

    /**
     * Constructor 
     * 
     * @param {number} width is the canvas width 
     * @param {number} height is the canvas height 
     */
    constructor(width, height) {

        this.width = width;
        this.height = height;
        this.groundMargin = 50;
        this.speed = 0;
        this.maxSpeed = 6;
        this.lives = 5;

        this.background = new Background(this);
        this.player = new Player(this);
        this.input = new InputHandler(this);
        this.UI = new UI(this);

        // We are referring collection of enemies, particles, collision and floating messages as child objects
        this.enemies = [];
        this.particles = [];
        this.collisions = [];
        this.floatingMessages = [];

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

    /**
     * Update objects coordinate
     * 
     * @param {number} deltaTime is the differnce in rendering time between two frame 
     */
    update(deltaTime) {

        this.time += deltaTime;
        // Since our game is time based after a certain time has passed we will stop the game 
        if (this.time > this.maxTime) {
            this.gameOver = true;
        }

        this.background.update();
        this.player.update(this.input, deltaTime);

        // We will add enemy after a certain time interval
        if (this.enemyTimer > this.enemyInterval) {
            this.addEnemy();
            this.enemyTimer = 0;
        } else {
            this.enemyTimer += deltaTime;
        }

        this.updateChildObjects([...this.enemies, ...this.particles, ...this.floatingMessages, ...this.collisions]);

        this.enemies = this.filterChildObjects(this.enemies);
        this.particles = this.filterChildObjects(this.particles);
        this.floatingMessages = this.filterChildObjects(this.floatingMessages);
        this.collisions = this.filterChildObjects(this.collisions);

        if (this.particles.length > this.maxParticles) {
            this.particles.length = this.maxParticles;
        }
    }

    /**
     * Update coordinate of child objects
     * 
     * @param {array} childObjects is collection of child object
     * @param {number} deltaTime is time elapsed since last frame has been rendered
     */
    updateChildObjects(childObjects, deltaTime) {
        childObjects.forEach(object => object.update(deltaTime));
    }

    /**
     * Draw child objects
     * 
     * @param {array} childObjects is collection of child object
     * @param {CanvasRenderingContext2D} is canvas rendering context
     */
    drawChildObjects(childObjects, context) {
        childObjects.forEach(childObject => childObject.draw(context));
    }

    /**
     * Filter child objects which are not marked for deletion 
     * 
     * @param {array} childObjects is an array of child objects
     * 
     * @returns filtered child objects 
     */
    filterChildObjects(childObjects) {
        return childObjects.filter(object => !object.markedForDeletion);
    }

    /**
     * Draw objects to canvas
     * 
     * @param {CanvasRenderingContext2D} context is the canvas context 
     */
    draw(context) {

        this.background.draw(context);
        this.player.draw(context);
        this.drawChildObjects([...this.enemies, ...this.particles, ...this.collisions, ...this.floatingMessages], context);
        this.UI.draw(context);
    }

    /**
     * Add enemy to the canvas 
     */
    addEnemy() {

        // When we are moving add either of ground enemy or spider enemy
        if (this.speed > 0) {
            this.enemies.push(Math.random() < 0.5 ? new GroundEnemy(this) : new ClimbingEnemy(this));
        }
        // Always add flying enemy 
        this.enemies.push(new FlyingEnemy(this));
    }
}