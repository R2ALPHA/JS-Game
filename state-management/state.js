import { action, LEFT, RIGHT, UP, DOWN } from "./input-handler.js";

//TODO:: Fix the bug
/**
 * Enum to handle states of player, It's like Finite State Machine
 */
export const states = {
    STANDING_LEFT: 0,
    STANDING_RIGHT: 1,
    SITTING_LEFT: 2,
    SITTING_RIGHT: 3,
    RUNNING_LEFT: 4,
    RUNNING_RIGHT: 5,
    JUMPING_LEFT: 6,
    JUMPING_RIGHT: 7
};

/**
 * Parent class of all the state
 */
export default class State {

    constructor(state) {
        this.state = state;
    }

    static getStateInReadableFormat(state) {
        return Object.keys(states)[state];
    }
}

/**
 * Class to handle standing left behaviour 
 */
export class StandingLeft extends State {

    constructor(player) {

        super(states.STANDING_LEFT);
        this.player = player;
    }
    enter() {

        this.player.frameY = 1;
        this.player.speed = 0;
    }

    handleInput(input) {

        if (input === action.PRESS + RIGHT) {
            this.player.setState(states.RUNNING_RIGHT);
        } else if (input === action.PRESS + DOWN) {
            this.player.setState(states.SITTING_LEFT)
        } else if (input === action.PRESS + LEFT) {
            this.player.setState(states.RUNNING_LEFT);
        } else if (input === action.PRESS + UP) {
            this.player.setState(states.JUMPING_LEFT);
        }
    }
}

/**
 * Class to handle standing right behavior
 */
export class StandingRight extends State {

    constructor(player) {
        super(states.STANDING_RIGHT);
        this.player = player;
    }

    enter() {

        this.player.frameY = 0;
        this.player.speed = 0;
    }

    handleInput(input) {

        if (input === action.PRESS + LEFT) {
            this.player.setState(states.RUNNING_LEFT);
        } else if (input === action.PRESS + DOWN) {
            this.player.setState(states.SITTING_RIGHT);
        } else if (input === action.PRESS + RIGHT) {
            this.player.setState(states.RUNNING_RIGHT);
        } else if (input === action.PRESS + UP) {
            this.player.setState(states.JUMPING_RIGHT);
        }
    }
}

/**
 * Class to handle standing right behavior
 */
export class SittingLeft extends State {

    constructor(player) {
        super(states.SITTING_LEFT);
        this.player = player;
    }

    enter() {

        this.player.frameY = 9;
        this.player.speed = 0;
    }

    handleInput(input) {
        if (input === action.PRESS + RIGHT) {
            this.player.setState(states.SITTING_RIGHT);
        } else if (input === action.PRESS + UP) {
            this.player.setState(states.STANDING_LEFT);
        } else if (input === action.RELEASE + DOWN) {
            this.player.setState(states.STANDING_LEFT);
        }
    }
}

/**
 * Class to handle standing right behavior
 */
export class SittingRight extends State {

    constructor(player) {
        super(states.SITTING_RIGHT);
        this.player = player;
    }

    enter() {

        this.player.frameY = 8;
        this.player.speed = 0;
    }

    handleInput(input) {
        if (input === action.PRESS + LEFT) {
            this.player.setState(states.SITTING_LEFT);
        } else if (input === action.PRESS + UP) {
            this.player.setState(states.STANDING_RIGHT)
        } else if (input === action.RELEASE + DOWN) {
            this.player.setState(states.STANDING_RIGHT);
        }
    }
}

export class RunningLeft extends State {

    constructor(player) {
        super(states.RUNNING_LEFT);
        this.player = player;
    }

    enter() {

        this.player.frameY = 7;
        this.player.speed = -this.player.maxSpeed;
    }

    handleInput(input) {
        if (input === action.PRESS + RIGHT) {
            this.player.setState(states.RUNNING_RIGHT);
        } else if (input === action.RELEASE + LEFT) {
            this.player.setState(states.STANDING_LEFT)
        } else if (input === action.PRESS + DOWN) {
            this.player.setState(states.SITTING_LEFT);
        }
    }
}

export class RunningRight extends State {

    constructor(player) {
        super(states.RUNNING_RIGHT);
        this.player = player;
    }

    enter() {

        this.player.frameY = 6;
        this.player.speed = this.player.maxSpeed;
    }

    handleInput(input) {
        if (input === action.PRESS + LEFT) {
            this.player.setState(states.RUNNING_RIGHT);
        } else if (input === action.PRESS + DOWN) {
            this.player.setState(states.SITTING_RIGHT)
        } else if (input === action.RELEASE + RIGHT) {
            this.player.setState(states.STANDING_RIGHT);
        }
    }
}

export class JumpingLeft extends State {

    constructor(player) {
        super(states.JUMPING_LEFT);
        this.player = player;
    }

    enter() {

        this.player.frameY = 3;

        if (this.player.onGround()) {
            this.player.vy -= 20;
        }

        this.player.speed = -this.player.maxSpeed * 0.5;
    }

    handleInput(input) {

        if (input === action.PRESS + RIGHT) {
            this.player.setState(states.JUMPING_RIGHT);
        } else if (this.player.onGround()) {
            this.player.setState(states.STANDING_LEFT);
        }
    }
}

export class JumpingRight extends State {

    constructor(player) {
        super(states.JUMPING_RIGHT);
        this.player = player;
    }

    enter() {

        this.player.frameY = 2;

        if (this.player.onGround()) {
            this.player.vy -= 20;
        }

        this.player.speed = this.player.maxSpeed * 0.5;
    }

    handleInput(input) {

        if (input === action.PRESS + LEFT) {
            this.player.setState(states.JUMPING_LEFT);
        } else if (this.player.onGround()) {
            this.player.setState(states.STANDING_RIGHT);
        }
    }
}