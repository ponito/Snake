function Grid() {
    _ctx.beginPath();
    _ctx.strokeStyle = 'seagreen'

    for (let x = 0; x < GLOBALS.grid.cells_x; x++) {
        for (let y = 0; y < GLOBALS.grid.cells_y; y++) {
            // Use image?
            _ctx.rect(
                x * GLOBALS.grid.cellsizeX,
                y * GLOBALS.grid.cellsizeY,
                GLOBALS.grid.cellsizeX,
                GLOBALS.grid.cellsizeY
            );
        }
    }
    _ctx.stroke();
}

function setGridSize(cells_x: number, cells_y: number) {
    GLOBALS.grid = {
        cells_x, cells_y,
        cellsizeX: _canvas.width / cells_x,
        cellsizeY: _canvas.height / cells_y,
    };
}