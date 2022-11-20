/** Note :: Touch handler code has been copied from state management module, hence it is not tested */
export default class InputHandler {

    keyTypes = {
        up: 'ArrowUp',
        down: 'ArrowDown',
        left: 'ArrowLeft',
        right: 'ArrowRight',
        swipeUp: 'SwipeUp',
        swipeDown: 'SwipeDown',
        swipeLeft: 'SwipeLeft',
        swipeRight: 'SwipeRight',
        enter: 'Enter'
    };

    /**
     * Constructor
     */
    constructor(game) {

        this.keys = [];
        this.touchY = 0;
        this.touchX = 0;
        this.touchThreshold = 50;
        this.game = game;

        const isElementInArray = (element, array) => array.indexOf(element) !== -1;

        const keyDownHandler = (event) => {

            if (this.isKeyPressed(event.key) && !isElementInArray(event.key, this.keys)) {
                this.keys.push(event.key);
            } else if (event.key === 'd') {
                this.game.debug = !this.game.debug;
            }
        };

        const keyUpHandler = (event) => {

            if (this.isKeyPressed(event.key)) {
                this.keys.splice(this.keys.indexOf(event.key), 1);
            }
        };

        const touchStartHandler = (event) => {

            this.touchY = event.changedTouches[0].pageY;
            this.touchX = event.changedTouches[0].pageX;
        };

        const touchMoveHandler = (event) => {

            const swipeYDistance = event.changedTouches[0].pageY - this.touchY;
            const swipeXDistance = event.changedTouches[0].pageX - this.touchX;

            if (swipeYDistance < - this.touchThreshold && !isElementInArray(this.keyTypes.swipeUp, this.keys)) {
                this.keys.push(this.keyTypes.swipeUp);
            } else if (swipeYDistance > this.touchThreshold && !isElementInArray(this.keyTypes.swipeDown, this.keys)) {
                this.keys.push(this.keyTypes.swipeDown);
                slideScrollerModule.resetGame();
            }

            if (swipeXDistance < -this.touchThreshold && !isElementInArray(this.keyTypes.swipeLeft, this.keys)) {
                this.keys.push(this.keyTypes.swipeLeft);
            } else if (swipeXDistance > this.touchThreshold && !isElementInArray(this.keyTypes.swipeRight, this.keys)) {
                this.keys.push(this.keyTypes.swipeRight);
            }
        };

        const touchEndHandler = (event) => {

            this.keys.splice(this.keys.indexOf(this.keyTypes.swipeUp), 1);
            this.keys.splice(this.keys.indexOf(this.keyTypes.swipeDown), 1);
            this.keys.splice(this.keys.indexOf(this.keyTypes.swipeLeft), 1);
            this.keys.splice(this.keys.indexOf(this.keyTypes.swipeRight), 1);
        };

        window.addEventListener('keyup', keyUpHandler);
        window.addEventListener('keydown', keyDownHandler);
        window.addEventListener('touchstart', touchStartHandler);
        window.addEventListener('touchmove', touchMoveHandler);
        window.addEventListener('touchend', touchEndHandler);
    }

    isKeyPressed(pressedKey) {
        return !!Object.keys(this.keyTypes).some(keyType => this.keyTypes[keyType] === pressedKey);
    }

    /**
     * Returns whether arrow key has been pressed or not
     * 
     * @param {string} pressedKey is the pressed event key
     */
    isArrowKeyPressed(pressedKey) {

        switch (pressedKey) {
            case this.keyTypes.down:
            case this.keyTypes.up:
            case this.keyTypes.left:
            case this.keyTypes.right:
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