const SHARED_STATE = {};
const GRID: Grid = {
    width: 15,
    height: 15,
    cell_width: canvas.width / 15,
    cell_height: canvas.height / 15,
};

const OBJECTS: renderable[] = [];
const TREASURES: Treasure[] = [];
const SNAKES: renderable[] = [];

function init() {
    fetch("config.json")
        .then(r => r.json())
        .then(config => {
            GRID.width = config.width | 15;
            GRID.height = config.height | 15;
            GRID.cell_width = canvas.width / GRID.width;
            GRID.cell_height = canvas.height / GRID.height;
        });
};

function updateFrames() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    renderBackground();
    renderObjects();
    renderPlayers();

    window.requestAnimationFrame(updateFrames);
}

init();
updateFrames();