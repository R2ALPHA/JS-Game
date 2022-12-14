import { Dust, Fire, Splash } from './particles.js';

// Enum for states 
export const states = {
    SITTING: 0,
    RUNNING: 1,
    JUMPING: 2,
    FALLING: 3,
    ROLLING: 4,
    DIVING: 5,
    HIT: 6
};

class State {

    /**
     * Constructor 
     * 
     * @param {number} state is the index of the state 
     * @param {Game} game is the game object  
     */
    constructor(state, game) {

        this.state = state;
        this.game = game;
    }

    static getStateInReadableFormat(state) {
        return Object.keys(states)[state];
    }
}

export class Sitting extends State {

    /**
     * Constructor 
     * 
     * @param {Game} game is the game object
     */
    constructor(game) {
        super(states.SITTING, game);
    }

    /**
     * Handles entering of a state
     */
    enter() {

        this.game.player.frameX = 0;
        this.game.player.frameY = 5;
        this.game.player.maxFrame = 4;
    }

    /**
     * Handles input
     * 
     * @param {InputHandler} input is the input handler object 
     */
    handleInput(input) {

        if (input.isContainsKey(input.keyTypes.left) || input.isContainsKey(input.keyTypes.right) || input.isContainsKey(input.keyTypes.up)) {
            this.game.player.setState(states.RUNNING, 1);
        } else if (input.isContainsKey(input.keyTypes.enter)) {
            this.game.player.setState(states.ROLLING, 2);
        }
    }
}

export class Running extends State {

    constructor(game) {
        super(states.RUNNING, game);
    }

    enter() {

        this.game.player.frameX = 0;
        this.game.player.frameY = 3;
        this.game.player.maxFrame = 8;
    }

    handleInput(input) {

        this.game.particles.unshift(new Dust(this.game, this.game.player.x + this.game.player.width * 0.5, this.game.player.y + this.game.player.height));

        if (input.isContainsKey(input.keyTypes.down)) {
            this.game.player.setState(states.SITTING, 0);
        } else if (input.isContainsKey(input.keyTypes.up)) {
            this.game.player.setState(states.JUMPING, 1);
        } else if (input.isContainsKey(input.keyTypes.enter)) {
            this.game.player.setState(states.ROLLING, 2);
        }
    }
}

export class Jumping extends State {

    constructor(game) {
        super(states.RUNNING, game);
    }

    enter() {

        if (this.game.player.onGround()) {
            this.game.player.vy -= 25;
        }

        this.game.player.frameX = 0;
        this.game.player.frameY = 1;
        this.game.player.maxFrame = 6;
    }

    handleInput(input) {
        if (this.game.player.vy > this.game.player.weight) {
            this.game.player.setState(states.FALLING, 1);
        } else if (input.isContainsKey(input.keyTypes.enter)) {
            this.game.player.setState(states.ROLLING, 2);
        } else if (input.isContainsKey(input.keyTypes.down)) {
            this.game.player.setState(states.DIVING, 0);
        }
    }
}

export class Falling extends State {

    constructor(game) {
        super(states.FALLING, game);
    }

    enter() {

        this.game.player.frameX = 0;
        this.game.player.frameY = 2;
        this.game.player.maxFrame = 6;
    }

    handleInput(input) {
        if (this.game.player.onGround()) {
            this.game.player.setState(states.RUNNING, 1);
        } else if (input.isContainsKey(input.keyTypes.enter)) {
            this.game.player.setState(states.ROLLING, 2);
        } else if (input.isContainsKey(input.keyTypes.down)) {
            this.game.player.setState(states.DIVING, 0);
        }
    }
}

export class Rolling extends State {

    constructor(game) {
        super(states.ROLLING, game);
    }

    enter() {

        this.game.player.frameX = 0;
        this.game.player.frameY = 6;
        this.game.player.maxFrame = 6;
    }

    handleInput(input) {
        this.game.particles.unshift(new Fire(this.game, this.game.player.x + this.game.player.width * 0.5, this.game.player.y + this.game.player.height * 0.5));

        if (!input.isContainsKey(input.keyTypes.enter) && this.game.player.onGround()) {
            this.game.player.setState(states.RUNNING, 1);
        } else if (!input.isContainsKey(input.keyTypes.enter) && !this.game.player.onGround()) {
            this.game.player.setState(states.FALLING, 1);
        } else if (input.isContainsKey(input.keyTypes.enter) && input.isContainsKey(input.keyTypes.up) && this.game.player.onGround()) {
            this.game.player.vy -= 27;
        } else if (input.isContainsKey(input.keyTypes.down) && !this.game.player.onGround()) {
            this.game.player.setState(states.DIVING, 0);
        }
    }
}

export class Diving extends State {

    constructor(game) {
        super(states.DIVING, game);
    }

    enter() {

        this.game.player.frameX = 0;
        this.game.player.frameY = 6;
        this.game.player.maxFrame = 6;
        this.game.player.vy = 15;
    }

    handleInput(input) {
        this.game.particles.unshift(new Fire(this.game, this.game.player.x + this.game.player.width * 0.5, this.game.player.y + this.game.player.height * 0.5));

        if (this.game.player.onGround()) {
            this.game.player.setState(states.RUNNING, 1);
            for (let index = 0; index < 30; ++index) {
                this.game.particles.unshift(new Splash(this.game, this.game.player.x + this.game.player.width * 0.5, this.game.player.y));
            }
        } else if (input.isContainsKey(input.keyTypes.enter) && this.game.player.onGround()) {
            this.game.player.setState(states.ROLLING, 2);
        }
    }
}

export class Hit extends State {

    constructor(game) {
        super(states.HIT, game);
    }

    enter() {

        this.game.player.frameX = 0;
        this.game.player.frameY = 4;
        this.game.player.maxFrame = 10;
        this.game.player.vy = 15;
    }

    handleInput(input) {

        if (this.game.player.frameX >= 10 && this.game.player.onGround()) {
            this.game.player.setState(states.RUNNING, 1);
        } else if (this.game.player.frameX >= 10 && !this.game.player.onGround()) {
            this.game.player.setState(states.FALLING, 1);
        }
    }
}