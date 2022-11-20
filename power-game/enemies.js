class Enemy {

    /**
     * Constructor
     */
    constructor() {
        this.frameX = 0;
        this.frameY = 0;
        this.fps = 20;
        this.frameInterval = 1000 / this.fps;
        this.frameTimer = 0;
        this.markedForDeletion = false;
    }

    /**
     * Update enemey coordinates
     * 
     * @param {number} deltaTime is rendering time difference between last and current frame 
     */
    update(deltaTime) {

        this.x -= this.speedX + this.game.speed;
        this.y += this.speedY;

        if (this.frameTimer > this.frameInterval) {
            this.frameTimer = 0;
            this.frameX = this.frameX < this.maxFrame ? this.frameX + 1 : 0;
        } else {
            this.frameTimer += deltaTime;
        }

        if (this.x + this.width < 0) {
            this.markedForDeletion = true;
        }
    }

    draw(context) {
        if (this.game.debug) {
            context.strokeRect(this.x, this.y, this.width, this.height);
        }
        context.drawImage(this.image, this.frameX * this.width, 0 * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
    }
}

export class FlyingEnemy extends Enemy {

    /**
     * Constructor 
     * 
     * @param {Game} game is game object
     */
    constructor(game) {

        super();

        this.game = game;
        this.width = 60;
        this.height = 44;

        // We will provide some offset for the enemy 
        this.x = this.game.width + Math.random() * this.game.width * 0.5;
        // Draw only to the upper half of the canvas
        this.y = Math.random() * this.game.height * 0.5;
        // Different enemy should have different speed, so randomize the speed 
        this.speedX = Math.random() + 1;
        this.speedY = 0;
        this.maxFrame = 5;
        this.image = document.getElementById('enemy_fly');

        // they will move in a sine wave kind of pattern
        this.angle = 0;
        this.va = Math.random() * 0.1 + 0.1;
    }

    /**
     * Update Flying enemey coordinate
     * 
     * @param {number} deltaTime is rendering time difference between last and current frame 
     */
    update(deltaTime) {

        super.update(deltaTime);

        // The flying enemy will move in a sine wave
        this.angle += this.va;
        this.y += Math.sin(this.angle);
    }
}

export class GroundEnemy extends Enemy {

    /**
     * Constructor 
     * 
     * @param {Game} game is the game object 
     */
    constructor(game) {

        super();

        this.game = game;
        this.width = 60;
        this.height = 87;

        this.x = this.game.width;
        this.y = this.game.height - this.height - this.game.groundMargin;

        this.image = document.getElementById('enemy_plant');

        this.speedX = 0;
        this.speedY = 0;
        this.maxFrame = 1;
    }
}

export class ClimbingEnemy extends Enemy {

    /**
     * Constructor 
     * 
     * @param {Game} game is the game object 
     */
    constructor(game) {

        super();

        this.game = game;
        this.width = 120;
        this.height = 144;

        this.x = this.game.width;
        this.y = Math.random() * this.game.height * 0.5;

        this.image = document.getElementById('enemy_spider_big');
        this.speedX = 0;

        // Randomise the direction of movement of spider, up or down direction 
        this.speedY = Math.random() > 0.5 ? 1 : -1;
        this.maxFrame = 5;
    }

    /**
     * Update Flying enemey coordinate
     * 
     * @param {number} deltaTime is rendering time difference between last and current frame 
     */
    update(deltaTime) {

        super.update(deltaTime);

        // If it strucks the ground, reverse the direction 
        if (this.y > this.game.height - this.height - this.game.groundMargin) {
            this.speedY *= -1;
        }

        // Marked it for deletion 
        if (this.y < - this.height) {
            this.markedForDeletion = true;
        }
    }

    draw(context) {

        super.draw(context);

        // Draw the spider web line 
        context.beginPath();
        context.moveTo(this.x + this.width / 2, 0);
        context.lineTo(this.x + this.width / 2, this.y + 50);
        context.stroke();
    }
}