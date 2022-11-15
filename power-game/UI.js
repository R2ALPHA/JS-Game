export class UI {

    constructor(game) {
        this.game = game;
        this.fontSize = 30;
        this.fontFamily = 'Helvetica';
        this.textAlign = 'left';
        this.fontColor = 'black';
    }

    draw(context) {
        context.font = this.fontSize + 'px ' + this.fontFamily;
        context.textAlign = this.textAlign;
        context.fillStyle = this.game.fontColor;
        // score
        context.fillText('Score : ' + this.game.score, 20, 50);
    }
}