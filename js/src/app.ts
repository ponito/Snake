const GLOBALS: any = {
    events: {
        'onFoodEaten': []
    },
    addEventListener(event: string, listener: (ev: {}) => any) {
        const listeners = GLOBALS.events[event];
        if (listeners) {
            listeners.push(listener);
        }
    },
    dispatchEvent(event: string, ev: {}) {
        const listeners = GLOBALS.events[event];
        for (const l of listeners) {
            l(ev);
        }
    }
};
const GRID: Grid = {
    width: 15,
    height: 15,
    cell_width: canvas.width / 15,
    cell_height: canvas.height / 15,
    player: null,
};

var OBJECTS: renderable[] = [];
var TREASURES: Treasure[] = [];
var SNAKES: renderable[] = [];

function init() {
    GRID.player = new Snake();

    SNAKES.push(GRID.player);
    new Treasure([floor(GRID.width / 2), floor(GRID.height / 2) - 2]);

    window.addEventListener('keydown', onKeydown);

    theatorFit();
};

function updateFrames() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    renderBackground();
    renderObjects();
    renderPlayers();

    window.requestAnimationFrame(updateFrames);
}

function reset() {
    OBJECTS = [];
    TREASURES = [];
    SNAKES = [];

    init();
}

init();
updateFrames();