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

const renderObjects = () => {
    OBJECTS.forEach(o => o.render());
    TREASURES.forEach(t => t.render());
};

const renderPlayers = () => SNAKES.forEach(s => s.render());

function updateFrames() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    renderBackground();
    renderObjects();
    renderPlayers();

    window.requestAnimationFrame(updateFrames);
}

init();
updateFrames();