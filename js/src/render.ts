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
    for (let x = 0; x < GRID.width; x++) {
        for (let y = 0; y < GRID.height; y++) {
            // Use image?
            draw.Square(100, [x, y])
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