function main() {
    console.log("Hello World!");

    let canvas = document.getElementById("canvas");
    let grid = new Grid(10, 10, 20, 20, canvas);

    for (let y = 0; y < 10; y++) {
        for (let x = 0; x < 10; x++) {
            if ((x + y) % 2 == 0)
                grid.setCell(x, y, 1);
        }
    }

    grid.draw();
}

class Grid {
    width;
    height;
    cellWidth;
    cellHeight;
    canvas;
    cells;
    colors;

    setCell(x, y, value) {
        this.cells[y * this.width + x] = value;
    }

    constructor(width, height, cellWidth, cellHeight, canvas) {
        this.width = width;
        this.height = height;
        this.cellWidth = cellWidth;
        this.cellHeight = cellHeight;

        canvas.width = width * cellWidth;
        canvas.height = height * cellHeight;
        this.canvas = canvas;

        this.cells = new Int32Array(width * height);

        this.colors = ["white", "green", "red"];
    }

    draw() {
        let ctx = canvas.getContext("2d");
        ctx.save();

        for (let i = 0; i < this.cells.length; i++) {
            ctx.fillStyle = this.colors[this.cells[i]];
            ctx.fillRect((i % this.width) * this.cellWidth, (Math.floor(i / this.height)) * this.cellHeight, this.cellWidth, this.cellHeight);
        }

        ctx.restore();
    }
}