const canvas = document.getElementById("snake-game") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");
const canvasDims = { width: 600, height: 600 };

const theatorFit = window.onresize = () => {
    let dims = {
        width: window.innerWidth,
        height: (canvasDims.height / canvasDims.width) * window.innerWidth
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

type GlobalsType = {
    grid: {
        cells_x: number,
        cells_y: number,
        cellsizeX: number,
        cellsizeY: number,
    },
    player: Snake
}

const GLOBALS: GlobalsType = {} as GlobalsType;
const TREASURES: Treasure[] = [];
const PROPS: renderable[] = [];
const SNAKES: renderable[] = [];

function init() {
    setGridSize(15, 15);
    GLOBALS.player = new Snake();
    SNAKES.push(GLOBALS.player);
    PROPS.push(new Treasure([
        floor(GLOBALS.grid.cells_x / 2),
        floor(GLOBALS.grid.cells_y / 2) - 2,
    ]));
    theatorFit();
}
interface renderable {
    render(): void
}

function renderBackground() {
    Grid();
}


function renderProps() {
    for (const p of PROPS) {
        p.render();
    }
}

function renderCharacters() {
    for (const c of SNAKES) {
        c.render();
    }
}

function renderControls() {

}

function startFrames() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    renderBackground();
    renderProps();
    renderCharacters();
    renderControls();

    window.requestAnimationFrame(startFrames);
}

init();
startFrames();