class InputHandler {

    arrowType = {
        up: 'ArrowUp',
        down: 'ArrowDown',
        left: 'ArrowLeft',
        right: 'ArrowRight',
        swipeUp: 'SwipeUp',
        swipeDown: 'SwipeDown',
        swipeLeft: 'SwipeLeft',
        swipeRight: 'SwipeRight'
    };

    /**
     * Constructor
     */
    constructor() {

        this.keys = [];
        this.touchY = 0;
        this.touchX = 0;
        this.touchThreshold = 50;

        const isElementInArray = (element, array) => array.indexOf(element) !== -1;

        const keyDownHandler = (event) => {

            if (this.isArrowKeyPressed(event.key) && !isElementInArray(event.key, this.keys)) {
                this.keys.push(event.key);
            }

            if (event.keyCode === 13) {
                slideScrollerModule.resetGame();
            }
        };

        const keyUpHandler = (event) => {

            if (this.isArrowKeyPressed(event.key)) {
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

            if (swipeYDistance < - this.touchThreshold && !isElementInArray(this.arrowType.swipeUp, this.keys)) {
                this.keys.push(this.arrowType.swipeUp);
            } else if (swipeYDistance > this.touchThreshold && !isElementInArray(this.arrowType.swipeDown, this.keys)) {
                this.keys.push(this.arrowType.swipeDown);
                slideScrollerModule.resetGame();
            }

            if (swipeXDistance < -this.touchThreshold && !isElementInArray(this.arrowType.swipeLeft, this.keys)) {
                this.keys.push(this.arrowType.swipeLeft);
            } else if (swipeXDistance > this.touchThreshold && !isElementInArray(this.arrowType.swipeRight, this.keys)) {
                this.keys.push(this.arrowType.swipeRight);
            }
        };

        const touchEndHandler = (event) => {

            this.keys.splice(this.keys.indexOf(this.arrowType.swipeUp), 1);
            this.keys.splice(this.keys.indexOf(this.arrowType.swipeDown), 1);
            this.keys.splice(this.keys.indexOf(this.arrowType.swipeLeft), 1);
            this.keys.splice(this.keys.indexOf(this.arrowType.swipeRight), 1);
        };

        window.addEventListener('keyup', keyUpHandler);
        window.addEventListener('keydown', keyDownHandler);
        window.addEventListener('touchstart', touchStartHandler);
        window.addEventListener('touchmove', touchMoveHandler);
        window.addEventListener('touchend', touchEndHandler);
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