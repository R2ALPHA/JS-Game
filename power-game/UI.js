export class UI {

    /**
     * Constructor 
     * 
     * @param {Game} game is the game object 
     */
    constructor(game) {

        this.game = game;
        this.fontSize = 30;
        this.fontFamily = 'Creepster';
        this.fontColor = 'black';
        this.livesImage = document.getElementById('lives');
        this.missionSuccessMessage = 'What are creatures of the night afraid of? YOU!!!';
        this.missionFailureMessage = "Nope. Better luck next time!";
    }

    /**
     * Draw objects to the canvas
     * 
     * @param {CanvasRenderingContext2D} context is canvas context
     */
    draw(context) {

        context.save();
        context.shadowOffsetX = 2;
        context.shadowOffsetY = 2;
        context.shadowColor = 'white';
        context.shadowBlur = 0;
        context.font = this.fontSize + 'px ' + this.fontFamily;
        context.textAlign = 'left';
        context.fillStyle = this.fontColor;
        context.fillText('Score : ' + this.game.score, 20, 50);
        context.font = this.fontSize * 0.8 + 'px' + this.fontFamily;
        context.fillText('Time: ' + (this.game.time * 0.001).toFixed(1), 20, 80);
        this.drawPlayerLives(context);
        this.game.gameOver && this.drawGameOverMessage(context);
        context.restore();
    }

    /**
     * Draw player lives 
     * 
     * @param {CanvasRenderingContext2D} context is canvas's context
     */
    drawPlayerLives(context) {
        for (let i = 0; i < this.game.lives; ++i) {
            context.drawImage(this.livesImage, 25 * i + 20, 95, 25, 25);
        }
    }

    /**
     * Draw game over message 
     * 
     * @param {CanvasRenderingContext2D} context is canvas's context
     */
    drawGameOverMessage(context) {

        context.textAlign = 'center';
        context.font = this.fontSize * 2 + 'px' + this.fontFamily;
        if (this.game.score > 5) {
            context.fillText('Boo-yah', this.game.width * 0.5, this.game.height * 0.5 - 20);
            context.font = this.fontSize * 0.7 + 'px' + this.fontFamily;
            context.fillText(this.missionSuccessMessage, this.game.width * 0.5, this.game.height * 0.5 + 20);
        } else {
            context.fillText('Love at first bite?', this.game.width * 0.5, this.game.height * 0.5 - 20);
            context.font = this.fontSize * 0.7 + 'px' + this.fontFamily;
            context.fillText(this.missionFailureMessage, this.game.width * 0.5, this.game.height * 0.5 + 20);
        }
    }
}