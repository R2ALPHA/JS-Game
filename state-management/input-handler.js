export const arrowKey = {
    LEFT: "ArrowLeft",
    RIGHT: "ArrowRight",
    UP: "ArrowUp",
    DOWN: "ArrowDown"
};

export const LEFT = " left";
export const RIGHT = " right";
export const UP = " up";
export const DOWN = " down";

export const action = {
    PRESS: "PRESS",
    RELEASE: "RELEASE"
}

/**
 * Input handler class
 */
export default class InputHandler {

    constructor() {

        this.lastKey = '';

        const updateLastKey = (key, type) => {
            switch (key) {
                case arrowKey.LEFT: this.lastKey = type + LEFT;
                    break;
                case arrowKey.RIGHT: this.lastKey = type + RIGHT;
                    break;
                case arrowKey.UP: this.lastKey = type + UP;
                    break;
                case arrowKey.DOWN: this.lastKey = type + DOWN;
                    break;
            }
        };

        const keyDownHandler = (event) => updateLastKey(event.key, action.PRESS);
        const keyUpHandler = (event) => updateLastKey(event.key, action.RELEASE);

        window.addEventListener('keydown', keyDownHandler);
        window.addEventListener('keyup', keyUpHandler);
    }
}