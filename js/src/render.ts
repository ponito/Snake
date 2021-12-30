const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const canvasDims = { width: 600, height: 600 };
const aspectRatio = canvasDims.height / canvasDims.width;

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