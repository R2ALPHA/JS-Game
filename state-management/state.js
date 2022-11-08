import { action, LEFT, RIGHT, UP, DOWN } from "./input-handler.js";

//TODO:: Fix the bug
/**
 * Enum to handle states of player, It's like Finite State Machine
 */
export const states = {
    STANDING_LEFT: 0,
    STANDING_RIGHT: 1,
    SITTING_LEFT: 2,
    SITTING_RIGHT: 3
};

/**
 * Parent class of all the state
 */
export default class State {

    constructor(state) {
        this.state = state;
    }
    static getStateInReadableFormat(state) {

        switch (state) {
            case 0: return Object.keys(states)[0];
            case 1: return Object.keys(states)[1];
            case 2: return Object.keys(states)[2];
            case 3: return Object.keys(states)[3];
        }
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
    }

    handleInput(input) {
        if (input === action.PRESS + RIGHT) {
            this.player.setState(states.STANDING_RIGHT);
        } else if (input === action.PRESS + DOWN) {
            this.player.setState(states.SITTING_LEFT)
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
    }

    handleInput(input) {
        if (input === action.PRESS + LEFT) {
            this.player.setState(states.STANDING_LEFT);
        } else if (input === action.PRESS + DOWN) {
            this.player.setState(states.SITTING_RIGHT);
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
    }

    handleInput(input) {
        if (input === action.PRESS + RIGHT) {
            this.player.setState(states.SITTING_RIGHT);
        } else if (input === action.PRESS + UP) {
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
    }

    handleInput(input) {
        if (input === action.PRESS + LEFT) {
            this.player.setState(states.SITTING_LEFT);
        } else if (input === action.PRESS + UP) {
            this.player.setState(states.STANDING_RIGHT)
        }
    }
}