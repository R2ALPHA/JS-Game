/**
 * The main entry script of the application.
 * Responible for navigating to different pages
 */
var mainModule = (function () {

    // DOM Caching 
    const gameModeElement = document.getElementById('gameModule');

    /**
     * Entry function for the module
     */
    function initialize() {
        addEventListener();
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