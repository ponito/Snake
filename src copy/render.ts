const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const canvasDims = { width: 600, height: 600 };
const aspectRatio = canvasDims.height / canvasDims.width;

const GRID: Grid = {};
const TREASURES: Treasure[] = [];
const SNAKES: renderable[] = [];

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

const renderBackground = () => {};

const renderObjects = () => {};

const renderPlayers = () => SNAKES.forEach(s => s.render());

const renderControls = () => {};

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