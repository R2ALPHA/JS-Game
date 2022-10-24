class InputHandler {

    arrowType = {
        up: 'ArrowUp',
        down: 'ArrowDown',
        left: 'ArrowLeft',
        right: 'ArrowRight'
    };

    /**
     * Constructor
     */
    constructor() {

        this.keys = [];

        const isElementInArray = (element, array) => array.indexOf(element) !== -1;

        const keyDownHandler = (event) => {
            if (this.isArrowKeyPressed(event.key) && !isElementInArray(event.key, this.keys)) {
                this.keys.push(event.key);
            }
        };

        const keyUpHandler = (event) => {
            if (this.isArrowKeyPressed(event.key)) {
                this.keys.splice(this.keys.indexOf(event.key), 1);
            }
        };

        window.addEventListener('keyup', keyUpHandler);
        window.addEventListener('keydown', keyDownHandler);
    }

    /**
     * Returns whether arrow key has been pressed or not
     * 
     * @param {string} pressedKey is the pressed event key
     */
    isArrowKeyPressed(pressedKey) {

        switch (pressedKey) {
            case this.arrowType.down:
            case this.arrowType.up:
            case this.arrowType.left:
            case this.arrowType.right:
                return true;
        }

        return false;
    }

    /**
     * Returns whether the array contains the key or not 
     * 
     * @param {string} key is the pressed key
     */
    isContainsKey(key) {
        return this.keys.indexOf(key) !== -1;
    }
}