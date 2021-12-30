function Grid() {
    ctx.beginPath();
    ctx.strokeStyle = 'seagreen'

    for (let x = 0; x < GLOBALS.grid.cells_x; x++) {
        for (let y = 0; y < GLOBALS.grid.cells_y; y++) {
            // Use image?
            ctx.rect(
                x * GLOBALS.grid.cellsizeX,
                y * GLOBALS.grid.cellsizeY,
                GLOBALS.grid.cellsizeX,
                GLOBALS.grid.cellsizeY
            );
        }
    }
    ctx.stroke();
}

function setGridSize(cells_x: number, cells_y: number) {
    GLOBALS.grid = {
        cells_x, cells_y,
        cellsizeX: canvas.width / cells_x,
        cellsizeY: canvas.height / cells_y,
    };
}