function main() {
    console.log("Hello World!");

    let canvas = document.getElementById("canvas");
    let grid = new Grid(10, 10, 20, 20, canvas);

    for (let y = 0; y < 10; y++) {
        for (let x = 0; x < 10; x++) {
            if ((x + y) % 2 == 0)
                grid.set(x, y, 1);
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

    get(x, y) {
        return this.cells[y * this.width + x];
    }
    set(x, y, value) {
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

        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                ctx.fillStyle = this.colors[this.get(x, y)];
                ctx.fillRect(x * this.cellWidth, y * this.cellHeight, this.cellWidth, this.cellHeight);
            }
        }

        ctx.restore();
    }
}