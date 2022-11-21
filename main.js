/**
 * The main entry script of the application.
 * Responible for navigating to different pages
 */
var mainModule = (function () {

    // DOM Caching 
    const gameModeElement = document.getElementById('gameModule');
    const typeWriterElement = document.getElementById('typeWriter');

    /**
     * Entry function for the module
     */
    function initialize() {

        addParticles();
        addEventListener();
        addTypeWriter();
    }

    /**
     * Add particles through particle.js library
     */
    function addParticles() {
        particlesJS.load('particles-js', './config.json', function () {
            console.log('callback - particles.js config loaded');
        });
    }

    /**
     * Add type writer through typewriter.js library
     */
    function addTypeWriter() {

        const typewriter = new Typewriter(typeWriterElement, {
            loop: true,
            cursorClassName: 'cursorSize' // SET TO MY CUSTOM CLASS NAME
        });

        typewriter.typeString('Hey, Thanks for jumping in')
            .pauseFor(2500)
            .deleteAll()
            .typeString('My name is Gourav Ananad and I am a software developer based in INDIA.')
            .pauseFor(2500)
            .deleteAll()
            .typeString('You can reach me at gourav.07anand[at]gmail.com')
            .pauseFor(2500)
            .start();

    }

    /**
     * Attach event listener
     */
    function addEventListener() {
        gameModeElement.onchange = selectGameModule;
    }

    /**
     * Select game module and navigate to different pages according to selection
     * 
     * @param {MouseEvent} event is the mouse event 
     */
    function selectGameModule(event) {

        const selectedGameModule = event.target.value;
        window.location.href = `./${selectedGameModule}/${selectedGameModule}.html`;
    }

    return {
        initialize
    }

})();

mainModule.initialize();