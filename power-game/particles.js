class Particle {

    /**
     * Constructor 
     * 
     * @param {Game} game is the game object 
     */
    constructor(game) {
        this.game = game;
        this.markedForDeletion = false;
    }

    /**
     * Update coordinates for particles
     */
    update() {

        this.x -= this.speedX + this.game.speed;
        this.y -= this.speedY;
        this.size *= 0.95;

        if (this.size < 0.5) {
            this.markedForDeletion = true;
        }
    }
}

export class Dust extends Particle {

    /**
     * Constructor 
     * 
     * @param {Game} game is the game object 
     * @param {number} x is the x coordinate  
     * @param {number} y is the y coordinate 
     */
    constructor(game, x, y) {

        super(game);
        this.size = Math.random() * 10 + 10;
        this.x = x;
        this.y = y;
        this.speedX = Math.random();
        this.speedY = Math.random();
        this.color = 'rgba(0,0,0,0.2)';
    }

    draw(context) {

        // Create circles for dust and just reduce their size on each iteration
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fillStyle = this.color;
        context.fill();
    }
}

export class Splash extends Particle {

    /**
     * Constructor 
     * 
     * @param {Game} game is the game object 
     * @param {number} x is the x coordinate  
     * @param {number} y is the y coordinate 
     */
    constructor(game, x, y) {

        super(game);

        this.size = Math.random() * 100 + 100;
        this.x = x - this.size * 0.4;
        this.y = y - this.size * 0.5;
        this.speedX = Math.random() * 6 - 3;
        this.speedY = Math.random() * 2 + 2;
        this.gravity = 0;
        this.image = document.getElementById('fire');
    }

    /**
     * update particle coordinate
     */
    update() {
        super.update();
        this.gravity += 0.1;
        this.y += this.gravity;
    }

    /**
     * Draw particles onto the canvas
     * 
     * @param {CanvasRenderingContext2D} context is canvas's context
     */
    draw(context) {
        context.drawImage(this.image, this.x, this.y, this.size, this.size);
    }
}

export class Fire extends Particle {

    /**
     * Constructor 
     * 
     * @param {Game} game is game object 
     * @param {number} x is the x coordiante 
     * @param {number} y is the y coordinate 
     */
    constructor(game, x, y) {

        super(game);

        this.image = document.getElementById('fire');
        this.size = Math.random() * 100 + 100;
        this.x = x;
        this.y = y;
        this.speedX = 1;
        this.speedY = 1;

        // Will move in sine pattern
        this.va = Math.random() * 0.2 - 0.1
        this.angle = 0;
    }

    /**
     * Update fire particles coordinates
     */
    update() {

        super.update();
        this.angle += this.va;
        this.x += Math.sin(this.angle * 5);
    }

    /**
     * Draw particles into the canvas. 
     * Rotate the fire object to the canvas
     * 
     * @param {CanvasRenderingContext2D} context is canvas's context 
     */
    draw(context) {

        context.save();
        context.translate(this.x, this.y);
        context.rotate(this.angle);
        context.drawImage(this.image, -this.size * 0.5, -this.size * 0.5, this.size, this.size);
        context.restore();
    }
}