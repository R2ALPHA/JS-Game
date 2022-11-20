class Layer {

    /**
     * Constructor 
     * 
     * @param {Game} game is game object 
     * @param {number} width is width of the canvas  
     * @param {number} height is height of the canvas
     * @param {number} speedModifier is speed modifier for layer (We can have differet layer moving at different speed)
     * @param {Image} image is image element
     */
    constructor(game, width, height, speedModifier, image) {

        this.game = game;
        this.width = width;
        this.height = height;
        this.speedModifier = speedModifier;
        this.image = image;
        this.x = 0;
        this.y = 0;
    }

    /**
     * Update background.
     * We will actually reset the coordinate of the image ,when entire layer has been drawn 
     */
    update() {
        if (this.x < -this.width) {
            this.x = 0;
        } else {
            this.x -= this.game.speed * this.speedModifier;
        }
    }

    /**
     * Draw background to the canvas. 
     * We are drawing 2 images, it will be helpful in creating an infinite background. 
     * ### Concept ####
     *  
     * @param {CanvasRenderingContext2D} context is the canvas context  
     */
    draw(context) {
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
    }
}

export class Background {

    /**
     * Constructor 
     * 
     * @param {Game} game is the Game object
     */
    constructor(game) {

        this.game = game;
        this.width = 1667;
        this.height = 500;

        this.layerImage1 = document.getElementById('layer1');
        this.layerImage2 = document.getElementById('layer2');
        this.layerImage3 = document.getElementById('layer3');
        this.layerImage4 = document.getElementById('layer4');
        this.layerImage5 = document.getElementById('layer5');

        this.layer1 = new Layer(this.game, this.width, this.height, 0, this.layerImage1);
        this.layer2 = new Layer(this.game, this.width, this.height, 0.2, this.layerImage2);
        this.layer3 = new Layer(this.game, this.width, this.height, 0.4, this.layerImage3);
        this.layer4 = new Layer(this.game, this.width, this.height, 0.8, this.layerImage4);
        this.layer5 = new Layer(this.game, this.width, this.height, 1, this.layerImage5);
        this.backgroundLayers = [this.layer1, this.layer2, this.layer3, this.layer4, this.layer5];
    }

    /**
     * Update background 
     */
    update() {
        this.backgroundLayers.forEach(layer => layer.update());
    }

    /**
     * Draw background layers
     * 
     * @param {CanvasRenderingContext2D} context is canvas contexts 
     */
    draw(context) {
        this.backgroundLayers.forEach(layer => layer.draw(context));
    }
}