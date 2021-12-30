const floor = Math.floor;

// functions for drawing in grid boxes


const draw = {
    color: 'black',
    fill: true,

    Square: (size: number, pos: Position, offset: [number, number] = [0, 0]) => {
        draw.Rectangle(size, size, pos, offset);
    },

    Rectangle: (width: number, height: number, pos: Position, offset: [number, number] = [0, 0]) => {
        const rect = draw.fill ? ctx.fillRect : ctx.strokeRect;
        if (draw.fill) { ctx.fillStyle = draw.color }
        else { ctx.strokeStyle = draw.color };

        let [x, y] = pos;
        x *= GRID.cell_width
        y *= GRID.cell_height

        let [dx, dy] = offset;
        dx *= GRID.cell_width / 100
        dy *= GRID.cell_height / 100

        width *= GRID.cell_width / 100
        height *= GRID.cell_height / 100
        rect(x + dx, y + dy, width, height);
    },
};

// math

function randInt(max: number, min = 0) {

}