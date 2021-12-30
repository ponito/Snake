class Snake implements renderable {
    length: number
    score: number

    head: SnakePart
    tail: SnakePart

    movement: number;

    constructor(length = 4, score = 0) {
        this.length = length;
        this.score = score;

        this.head = new SnakePart();
        this.head.render = () => {
            draw.color = 'dodgerblue';
            draw.Square(80, this.head.pos);
        };

        let next = this.head;
        let current: SnakePart;
        while (--length > 0) {
            current = new SnakePart(next);
            next = current;
        }

        this.tail = current;

        this.movement = setInterval(() => {
            // ...
        }, 500);
    }

    render(): void {
        this.tail.render();
    }
}

class SnakePart implements renderable {
    next: SnakePart

    pos: Position
    direction: Direction

    constructor(next: SnakePart = null) {
        this.next = next;
        if (next == null) {
            this.pos = [floor(GRID.width / 2), floor(GRID.height / 2)];
            this.direction = Direction.UP;
        } else {
            const [x, y] = next.pos;
            switch (next.direction) {
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
            this.direction = next.direction;
        }
    }

    render(): void {
        throw new Error("Method not implemented.");
    }
}

class Treasure {
    type = TreasureType.APPLE

    pos: [number, number]

    constructor(pos: typeof Treasure.prototype.pos, type = TreasureType.APPLE) {
        this.type = type;

        this.pos = pos;

        TREASURES.push(this);
    }

    render(): void {
        draw.Square(50, this.pos, [0, 30])
    }
}