/**
 * Draw text to show the current status of player i.e standing left, standing right etc.
 * 
 * @param {CanvasRenderingContext2D} context is the canvas context 2d 
 * @param {InputHandler} input is the input handler object 
 */
export function drawStatusText(context, input) {

    context.font = '30px Helvetica';
    context.fillText('Last input: ' + input.lastKey, 20, 50);
}