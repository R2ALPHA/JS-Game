const states = {
    SITTING: 0,
    RUNNING: 1,
    JUMPING: 2,
    FALLING: 3
};

class State {

    constructor(state) {
        this.state = state;
    }

    static getStateInReadableFormat(state) {
        return Object.keys(states)[state];
    }
}

export class Sitting extends State {

    constructor(player) {
        super(states.SITTING);
        this.player = player;
    }

    enter() {

        this.player.frameX = 0;
        this.player.frameY = 5;
        this.player.maxFrame = 4;
    }

    handleInput(input) {

        if (input.isContainsKey(input.keyTypes.left) || input.isContainsKey(input.keyTypes.right) || input.isContainsKey(input.keyTypes.up)) {
            this.player.setState(states.RUNNING, 1);
        }
    }
}

export class Running extends State {

    constructor(player) {
        super(states.RUNNING);
        this.player = player;
    }

    enter() {

        this.player.frameX = 0;
        this.player.frameY = 3;
        this.player.maxFrame = 6;
    }

    handleInput(input) {

        if (input.isContainsKey(input.keyTypes.down)) {
            this.player.setState(states.SITTING, 0);
        } else if (input.isContainsKey(input.keyTypes.up)) {
            this.player.setState(states.JUMPING, 1);
        }
    }
}

export class Jumping extends State {

    constructor(player) {
        super(states.RUNNING);
        this.player = player;
    }

    enter() {

        if (this.player.onGround()) {
            this.player.vy -= 30;
        }

        this.player.frameX = 0;
        this.player.frameY = 1;
        this.player.maxFrame = 6;
    }

    handleInput(input) {
        if (this.player.vy > this.player.weight) {
            this.player.setState(states.FALLING, 1);
        }
    }
}

export class Falling extends State {

    constructor(player) {
        super(states.FALLING);
        this.player = player;
    }

    enter() {

        this.player.frameX = 0;
        this.player.frameY = 2;
        this.player.maxFrame = 6;
    }

    handleInput(input) {
        if (this.player.onGround()) {
            this.player.setState(states.RUNNING, 1);
        }
    }
}