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
    RUNNING_RIGHT: 5
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
    }

    handleInput(input) {
        if (input === action.PRESS + RIGHT) {
            this.player.setState(states.RUNNING_RIGHT);
        } else if (input === action.PRESS + DOWN) {
            this.player.setState(states.SITTING_LEFT)
        } else if (input === action.PRESS + LEFT) {
            this.player.setState(states.RUNNING_LEFT);
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
            this.player.setState(states.RUNNING_LEFT);
        } else if (input === action.PRESS + DOWN) {
            this.player.setState(states.SITTING_RIGHT);
        } else if (input == action.PRESS + RIGHT) {
            this.player.setState(states.RUNNING_RIGHT);
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