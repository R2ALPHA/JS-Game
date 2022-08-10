/**
 * This module handles sprite animation 
 */
var spriteAnimationModule = (function () {

    let playerState = 'run';

    // Dom caching 
    const dropDown = document.getElementById('animations');
    const canvas = document.getElementById('canvas');

    const ctx = canvas.getContext('2d');

    // Canvas width and height
    const CANVAS_WIDTH = canvas.width = 600;
    const CANVAS_HEIGHT = canvas.height = 600;

    // Create player image constructor
    const playerImage = new Image();

    // Image width / number of column
    const SPRITE_WIDTH = 575;

    // Image height / number of height
    const SPRITE_HEIGHT = 523;

    let gameFrame = 0;

    const staggerFrames = 5;

    const spriteAnimations = [];

    const animationFrames = [
        {
            name: 'idle',
            frames: 7
        },
        {
            name: 'jump',
            frames: 6
        },
        {
            name: 'fall',
            frames: 7
        },
        {
            name: 'run',
            frames: 9
        },
        {
            name: 'dizzy',
            frames: 11
        },
        {
            name: 'sit',
            frames: 5
        },
        {
            name: 'roll',
            frames: 7
        },
        {
            name: 'bite',
            frames: 7
        },
        {
            name: 'ko',
            frames: 6
        },
        {
            name: 'getHit',
            frames: 4
        },
    ];

    /**
     * Entry function for the application
     */
    function initialize() {

        addEventListener();

        setSpriteSource('./resource/shadow_dog.png');
        setSpriteAnimation();

        animate();
    }

    /**
     * Attach event listener 
     */
    function addEventListener() {
        dropDown.addEventListener('change', event => {
            playerState = event.target.value;
        });
    }

    /**
     * Set player/ sprite image source 
     * 
     * @param {string} source is the actual location where image is present 
     */
    function setSpriteSource(source) {
        playerImage.src = source;
    }

    /**
     * Handles sprite animation. 
     * Repaint the canvas after fix interval of time
     */
    function animate() {

        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        // Get the position (index)
        let position = Math.floor(gameFrame / staggerFrames) % spriteAnimations[playerState].loc.length;

        // Calculate x and y coordinate 
        let frameX = SPRITE_WIDTH * position;
        let frameY = spriteAnimations[playerState].loc[position].y;
        ctx.drawImage(playerImage, frameX, frameY, SPRITE_WIDTH, SPRITE_HEIGHT, 0, 0, SPRITE_WIDTH, SPRITE_HEIGHT);

        gameFrame++;

        requestAnimationFrame(animate);
    }

    /**
     * Set sprite animation array 
     */
    function setSpriteAnimation() {

        animationFrames.forEach((state, index) => {

            let frames = {
                loc: []
            };

            const frameCount = state.frames;

            for (let j = 0; j < frameCount; ++j) {

                let positionX = j * SPRITE_WIDTH;
                let positionY = index * SPRITE_HEIGHT;
                frames.loc.push({ x: positionX, y: positionY });
            }

            spriteAnimations[state.name] = frames;
        });
    }


    return {
        initialize
    }

})();

spriteAnimationModule.initialize();