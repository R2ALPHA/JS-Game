// The below comment will tell vs code that this is the canvas project, it will suggest us methods related to vs code only
/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = canvas.width = 500;
const CANVAS_HEIGHT = canvas.height = 1000;
const enemiesArray = [];

let numberOfEnemies = 100;

// To slow down sprite switching
let gameFrame = 0;
for (let i = 0; i < numberOfEnemies; ++i) {
    enemiesArray.push(new Enemy());
}

/**
 * Perform animation 
 */
function animate() {

    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    enemiesArray.forEach(enemy => {

        enemy.update(gameFrame);
        enemy.draw();
    });

    gameFrame++;
    requestAnimationFrame(animate)
}

animate();