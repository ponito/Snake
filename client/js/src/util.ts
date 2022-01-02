const floor = Math.floor;
const min = Math.min;
const max = Math.max;
const pi = Math.PI;

enum Direction {
    UP = 'up',
    DOWN = 'down',
    LEFT = 'left',
    RIGHT = 'right',
}

// functions for drawing in grid boxes

const draw = {
    color: 'black',
    fill: true,

    Square(size: number, pos: Position, offset: Offset = [0, 0]) {
        draw.Rectangle(size, size, pos, offset);
    },

    Rectangle(width: number, height: number, pos: Position, offset: Offset = [0, 0]) {
        let [x, y] = pos;
        x *= GRID.cell_size;
        y *= GRID.cell_size;

        let [dx, dy] = offset;
        dx *= GRID.cell_size / 100;
        dy *= GRID.cell_size / 100;

        width *= GRID.cell_size / 100;
        height *= GRID.cell_size / 100;

        x += (GRID.cell_size - width) / 2;
        y += (GRID.cell_size - height) / 2;

        if (draw.fill) {
            ctx.fillStyle = draw.color;
            ctx.fillRect(x + dx, y + dy, width, height);
        }
        else {
            ctx.strokeStyle = draw.color;
            ctx.strokeRect(x + dx, y + dy, width, height);
        }
    },

    RingQuarter(width: number, quarter: Quarter, pos: Position) {
        const half = GRID.cell_size / 2;
        const dw = width / 200 * GRID.cell_size;

        let [x, y] = pos;
        x = x * GRID.cell_size + half;
        y = y * GRID.cell_size + half;

        let outer = {} as { start: Position, control: Position, end: Position };
        let inner = {} as typeof outer;
        const outer_r = half + dw, inner_r = half - dw;

        switch (quarter) {
            case 'top-left':
                outer.start = [x + dw, y - half];
                outer.control = [x + dw, y + dw];
                outer.end = [x - half, y + dw];
                inner.start = [x - dw, y - half];
                inner.control = [x - dw, y - dw];
                inner.end = [x - half, y - dw];
                break;
            case 'top-right':
                outer.start = [x + half, y + dw];
                outer.control = [x - dw, y + dw];
                outer.end = [x - dw, y - half];
                inner.start = [x + half, y - dw];
                inner.control = [x + dw, y - dw];
                inner.end = [x + dw, y - half];
                break;
            case 'bot-right':
                outer.start = [x - dw, y + half];
                outer.control = [x - dw, y - dw];
                outer.end = [x + half, y - dw];
                inner.start = [x + dw, y + half];
                inner.control = [x + dw, y + dw];
                inner.end = [x + half, y + dw];
                break;
            case 'bot-left':
                outer.start = [x - half, y - dw];
                outer.control = [x + dw, y - dw];
                outer.end = [x + dw, y + half];
                inner.start = [x - half, y + dw];
                inner.control = [x - dw, y + dw];
                inner.end = [x - dw, y + half];
                break;
        }

        ctx.moveTo(...outer.start);
        ctx.arcTo(...outer.control, ...outer.end, outer_r);
        ctx.lineTo(...inner.end);
        ctx.arcTo(...inner.control, ...inner.start, inner_r);
        ctx.lineTo(...outer.start);
        ctx.closePath();

        ctx.fillStyle = draw.color;
        ctx.fill();
        ctx.beginPath();
    },

};

// math

function randInt(max: number, min = 0) {
    return floor((1 - Math.random()) * (max - min + 1)) + min;
}