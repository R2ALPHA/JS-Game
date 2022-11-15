import { Dust } from './particles.js';

const states = {
    SITTING: 0,
    RUNNING: 1,
    JUMPING: 2,
    FALLING: 3,
    ROLLING: 4,
    DIVING: 5,
    HIT: 6
};

class State {

    constructor(state, game) {
        this.state = state;
        this.game = game;
    }

    static getStateInReadableFormat(state) {
        return Object.keys(states)[state];
    }
}

export class Sitting extends State {

    constructor(game) {
        super(states.SITTING, game);
    }

    enter() {

        this.game.player.frameX = 0;
        this.game.player.frameY = 5;
        this.game.player.maxFrame = 4;
    }

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
        this.game.player.maxFrame = 6;
    }

    handleInput(input) {

        this.game.particles.push(new Dust(this.game, this.game.player.x + this.game.player.width * 0.5, this.game.player.y + this.game.player.height));

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
            this.game.player.vy -= 30;
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
        if (!input.isContainsKey(input.keyTypes.enter) && this.game.player.onGround()) {
            this.game.player.setState(states.RUNNING, 1);
        } else if (!input.isContainsKey(input.keyTypes.enter) && !this.game.player.onGround()) {
            this.game.player.setState(states.FALLING, 1);
        } else if (input.isContainsKey(input.keyTypes.enter) && input.isContainsKey(input.keyTypes.up) && this.game.player.onGround()) {
            this.game.player.vy -= 27;
        }
    }
}