const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const canvasDims = { width: 600, height: 600 };
const aspectRatio = canvasDims.height / canvasDims.width;

const SHARED_STATE = {};
const GRID: Grid = {
    // TODO configuration
    width: 15,
    height: 15,
    cell_width: canvas.width / 15,
    cell_height: canvas.height / 15,
};
const TREASURES: Treasure[] = [];
const SNAKES: renderable[] = [];

function init() {
    fetch("config.json").then(() => {

    })
};

const theatorFit = window.onresize = () => {
    let dims = {
        width: window.innerWidth,
        height: aspectRatio * window.innerWidth
    };

    if (window.innerHeight > dims.height) {
        canvas.style.width = "100%";
        canvas.style.height = "initial";
        canvas.style.top = `calc(50% - ${dims.height + "px"}/2)`;
    } else {
        canvas.style.height = "100%";
        canvas.style.width = "initial";
        canvas.style.top = "initial";
    }
}

function renderBackground() {
    draw.color = 'seagreen';
    draw.fill = false;
    for (let x = 0; x < GRID.cell_width; x++) {
        for (let y = 0; y < GRID.cell_height; y++) {
            // Use image?
            draw.Rectangle(GRID.cell_width, GRID.cell_height,
                [x * GRID.cell_width, y * GRID.cell_height])
        }
    }
    draw.fill = true;
    ctx.stroke();
};

const renderObjects = () => { };

const renderPlayers = () => SNAKES.forEach(s => s.render());

const renderControls = () => { };

function updateFrames() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    renderBackground();
    renderObjects();
    renderPlayers();
    renderControls();

    window.requestAnimationFrame(updateFrames);
}

init();
updateFrames();