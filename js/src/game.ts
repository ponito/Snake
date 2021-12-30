const floor = Math.floor;

enum Direction {
    UP = 'up',
    DOWN = 'down',
    LEFT = 'left',
    RIGHT = 'right',
};

class Snake {
    head: SnakeHead
    movement: number

    constructor() {
        this.head = new SnakeHead();
        this.movement = setInterval(() => {
            this.head.move(Direction.UP);
        }, 1000);
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
        let next: SnakeHead | SnakeBody = new SnakeBody(this);
        this.neck = next;
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
                newPos = [x, y - 1];
                break;
            case Direction.DOWN:
                newPos = [x, y + 1];
                break;
            case Direction.LEFT:
                newPos = [x - 1, y];
                break;
            case Direction.RIGHT:
                newPos = [x + 1, y];
                break;
        }
        newPos = [
            (newPos[0] + GLOBALS.grid.cells_x) % GLOBALS.grid.cells_x,
            (newPos[1] + GLOBALS.grid.cells_y) % GLOBALS.grid.cells_y
        ];
        const newNeck = this.tail;
        this.tail = newNeck.next as SnakeBody;
        this.neck.next = newNeck;
        this.neck = newNeck;
        newNeck.next = this;
        newNeck.pos = this.pos;

        this.pos = newPos;

        const t = GLOBALS.treasures.find(t => t.pos[0] == newPos[0] && t.pos[1] == newPos[1])
        if (t) this.consume(t);

        this.neck.direction = this.direction;
        this.direction = direction;
    }

    consume(t: Treasure) {
        switch (t.type) {
            case 'apple':
                this.grow();
                const i = PROPS.findIndex((v) => v === t);
                PROPS = PROPS.filter((_, j) => j != i);
                console.log(PROPS);
        }
    }

    grow(size = 1) {
        while (size > 0) {
            const newTail = new SnakeBody(this);
            newTail.next = this.tail;
            this.tail = newTail;
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

        GLOBALS.treasures.push(this);
    }

    render(): void {
        const [x, y] = this.pos;
        ctx.fillStyle = 'crimson'
        ctx.fillRect(
            x * GLOBALS.grid.cellsizeX + GLOBALS.grid.cellsizeX / 4,
            y * GLOBALS.grid.cellsizeY + GLOBALS.grid.cellsizeX * 0.3,
            GLOBALS.grid.cellsizeX * 0.5,
            GLOBALS.grid.cellsizeY * 0.5
        );
    }
}