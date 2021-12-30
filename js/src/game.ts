const floor = Math.floor;

enum Direction {
    UP = 'up',
    DOWN = 'down',
    LEFT = 'left',
    RIGHT = 'right',
};

class Snake {
    head: SnakeHead

    constructor() {
        this.head = new SnakeHead();
    }

    render() {
        this.head.tail.render();
    }
}

class SnakeHead {
    length: number = 3
    score: number = 0

    neck: SnakeBody
    tail: SnakeBody

    pos: [number, number] = [
        floor(GLOBALS.grid.cells_x / 2),
        floor(GLOBALS.grid.cells_y / 2),
    ]
    direction: Direction = Direction.UP

    constructor() {
        let next: SnakeHead | SnakeBody = this.neck = new SnakeBody(this);
        let current: SnakeBody;
        let length = this.length;
        while (--length > 0) {
            current = new SnakeBody(next);
            next = current;
        }
        this.tail = current;
    }

    move(direction: Direction) {
        const [x, y] = this.pos;
        let newPos: typeof this.pos;
        switch (direction) {
            case Direction.UP:
                newPos = [x, y + 1];
                break;
            case Direction.DOWN:
                newPos = [x, y - 1];
                break;
            case Direction.LEFT:
                newPos = [x - 1, y];
                break;
            case Direction.RIGHT:
                newPos = [x + 1, y];
                break;
        }
        const t = GLOBALS.treasures.find(t => t.pos == newPos)
        if (t) this.consume(t);
        this.direction = direction;
        this.pos = newPos;

        // TODO (check out of bounds) Lose game when leaving grid
    }

    consume(t: Treasure) {
        switch (t.type) {
            case 'apple':
                this.grow();
                break;
        }
    }

    grow(size = 1) {
        while (size > 0) {
            this.neck = this.neck.next = new SnakeBody(this);
            size -= 1;
        }
    }

    render(): void {
        const [x, y] = this.pos;
        ctx.fillStyle = 'dodgerblue'
        ctx.fillRect(
            x * GLOBALS.grid.cellsizeX + GLOBALS.grid.cellsizeX / 10,
            y * GLOBALS.grid.cellsizeY + GLOBALS.grid.cellsizeX / 10,
            GLOBALS.grid.cellsizeX * 0.8,
            GLOBALS.grid.cellsizeY * 0.8
        );
    }
}

class SnakeBody {
    next: SnakeHead | SnakeBody

    pos: [number, number]
    direction: Direction

    constructor(next: SnakeHead | SnakeBody, direction: Direction = next.direction) {
        this.next = next;
        const [x, y] = next.pos;
        switch (direction) {
            case Direction.UP:
                this.pos = [x, y + 1];
                break;
            case Direction.DOWN:
                this.pos = [x, y - 1];
                break;
            case Direction.LEFT:
                this.pos = [x - 1, y];
                break;
            case Direction.RIGHT:
                this.pos = [x + 1, y];
                break;
        }
        this.direction = direction;
    }

    render(): void {
        const [x, y] = this.pos;
        ctx.fillStyle = 'dodgerblue'
        ctx.fillRect(
            x * GLOBALS.grid.cellsizeX + GLOBALS.grid.cellsizeX / 5,
            y * GLOBALS.grid.cellsizeY + GLOBALS.grid.cellsizeX / 5,
            GLOBALS.grid.cellsizeX * 0.6,
            GLOBALS.grid.cellsizeY * 0.6
        );

        this.next.render();
    }
}

type TreasureType = 'apple'

class Treasure {
    type: TreasureType = 'apple'

    pos: [number, number]

    constructor(pos: typeof Treasure.prototype.pos, type: TreasureType = 'apple') {
        this.type = type;

        this.pos = pos;
    }

    render(): void {

    }
}

function setGridSize(cells_x: number, cells_y: number) {
    GLOBALS.grid = {
        cells_x, cells_y,
        cellsizeX: canvas.width / cells_x,
        cellsizeY: canvas.height / cells_y,
    };
}