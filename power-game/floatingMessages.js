export class FloatingMessage {

    /**
     * Constructor 
     * 
     * @param {string} value is the value/msg to be drawn to the canvas 
     * @param {number} x is the source x coordinate 
     * @param {number} y is the source y coordinate
     * @param {number} targetX is the destination x coordiante 
     * @param {number} targetY is the destination y coordinate
     */
    constructor(value, x, y, targetX, targetY) {

        this.value = value;
        this.x = x;
        this.y = y;
        this.targetX = targetX;
        this.targetY = targetY;
        this.markedForDeletion = false;
        this.timer = 0;
        this.speedModifier = 0.03;
        this.font = "20px Creepster";
    }

    /**
     * Update coordiante
     */
    update() {

        this.x += this.getDistanceToMove(this.x, this.targetX, this.speedModifier);
        this.y += this.getDistanceToMove(this.y, this.targetY, this.speedModifier);

        this.timer++;
        if (this.timer > 100) {
            this.markedForDeletion = true;
        }
    }

    /**
     * Returns distance to move 
     * ### Concept ###
     * 
     * @param {number} src is the source point  
     * @param {number} dest is the dest point  
     * @param {number} speed at which we need to move toward the target point
     * 
     * @returns the distance to move  
     */
    getDistanceToMove(src, dest, speed) {
        return (dest - src) * speed;
    }

    /**
     * Draw floating message to the canvas 
     * 
     * @param {CanvasRenderingContext2D} context is canvas context 
     */
    draw(context) {
        context.font = this.font;
        context.fillStyle = 'white';
        context.fillText(this.value, this.x, this.y);
        context.fillStyle = 'black';
        context.fillText(this.value, this.x + 2, this.y + 2);
    }
}