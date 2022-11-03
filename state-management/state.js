import { action, LEFT, RIGHT } from "./input-handler.js";

/**
 * Enum to handle states of player, It's like Finite State Machine
 */
export const states = {
    STANDING_LEFT: 0,
    STANDING_RIGHT: 1,
};

/**
 * Parent class of all the state
 */
export default class State {
    constructor(state) {
        this.state = state;
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
        }
    }
}