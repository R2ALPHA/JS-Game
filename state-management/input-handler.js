export const arrowKey = {
    LEFT: "ArrowLeft",
    RIGHT: "ArrowRight"
};

export const LEFT = " left";
export const RIGHT = " right";

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
            }
        };

        const keyDownHandler = (event) => updateLastKey(event.key, action.PRESS);
        const keyUpHandler = (event) => updateLastKey(event.key, action.RELEASE);

        window.addEventListener('keydown', keyDownHandler);
        window.addEventListener('keyup', keyUpHandler);
    }
}