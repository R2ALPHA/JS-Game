/**
 * Draw text to show the current status of player i.e standing left, standing right etc.
 * 
 * @param {CanvasRenderingContext2D} context is the canvas context 2d 
 * @param {InputHandler} input is the input handler object 
 * @param {string} state is the current actice state of player 
 */
export function drawStatusText(context, input, state) {

    context.font = '20px Helvetica';
    context.fillText('Last input: ' + (input.lastKey.trim() === "" ? 'N/A' : input.lastKey), 20, 50);
    context.fillText('Active state: ' + state, 20, 80);
}