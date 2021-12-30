enum Direction {
    UP = 'up',
    DOWN = 'down',
    LEFT = 'left',
    RIGHT = 'right',
}

class Snake implements renderable {
    length: number
    score: number

    head: SnakePart
    tail: SnakePart

    direction: Direction = Direction.UP;
    movement: any;

    constructor(length = 4, score = 0) {
        this.length = Math.min(3, length);
        this.score = score;

        this.head = new SnakePart();

        let next = this.head;
        let current: SnakePart;
        while (--length > 0) {
            current = new SnakePart(next);
            next = current;
        }

        this.tail = current;

        this.movement = setInterval(() => {
            this.move();
        }, 500);
    }

    move() {
        const [x, y] = this.head.pos;
        let newPos: typeof this.head.pos;

        switch (this.direction) {
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
            (newPos[0] + GRID.width) % GRID.width,
            (newPos[1] + GRID.height) % GRID.height
        ];

        const newHead = this.tail;
        this.tail = newHead.next;
        newHead.next = null;
        this.head.next = newHead;
        this.head = newHead;
        newHead.pos = newPos;

        newHead.direction = this.direction;

        const t = TREASURES.find(t => t.pos[0] == newPos[0] && t.pos[1] == newPos[1])
        if (t) this.consume(t);
    }

    consume(t: Treasure) {
        switch (t.type) {
            case TreasureType.APPLE:
                this.grow();
                TREASURES.splice(TREASURES.findIndex((v) => v === t), 1);

                let newPos: [number, number] = [-1, -1];
                let blocked = true;
                while (blocked) {
                    blocked = false;
                    newPos = [randInt(GRID.width - 1), randInt(GRID.height - 1)];

                    let next = this.tail;
                    while (next !== null) {
                        if (next.pos[0] == newPos[0] && next.pos[1] == newPos[1]) {
                            blocked = true;
                            next = null;
                            break;
                        }

                        next = next.next;
                    }
                }
                new Treasure(newPos, TreasureType.APPLE);
                break;
        }
    }

    grow(addedParts = 1) {
        while (addedParts > 0) {
            const newTail = new SnakePart(this.tail);
            this.tail = newTail;
            addedParts -= 1;
        }
    }

    render(): void {
        draw.color = "dodgerblue";
        switch(this.tail.next.direction) {
            case Direction.UP:
                    draw.Rectangle(75, 87.5, [this.tail.pos[0], this.tail.pos[1] - 0.125]);
                    break;
            case Direction.DOWN:
                    draw.Rectangle(75, 87.5, [this.tail.pos[0], this.tail.pos[1] + 0.125])
                    break;
            case Direction.LEFT:
                    draw.Rectangle(87.5, 75, [this.tail.pos[0] - 0.125, this.tail.pos[1]])
                    break;
            case Direction.RIGHT:
                    draw.Rectangle(87.5, 75, [this.tail.pos[0] + 0.125, this.tail.pos[1]])
                    break;
        }

        let next = this.tail.next;
        while(next !== this.head) {
            if (next.direction === next.next.direction) {
                switch(next.next.direction) {
                    case Direction.UP:
                            draw.Rectangle(75, 100, [next.pos[0], next.pos[1]]);
                            break;
                    case Direction.DOWN:
                            draw.Rectangle(75, 100, [next.pos[0], next.pos[1]])
                            break;
                    case Direction.LEFT:
                            draw.Rectangle(100, 75, [next.pos[0], next.pos[1]])
                            break;
                    case Direction.RIGHT:
                            draw.Rectangle(100, 75, [next.pos[0], next.pos[1]])
                            break;
                }
            }
            else {
                if ((next.direction === Direction.UP && next.next.direction === Direction.LEFT) ||
                (next.direction === Direction.RIGHT && next.next.direction === Direction.DOWN)) {
                    // arc left to down
                }
                else if ((next.direction === Direction.UP && next.next.direction === Direction.RIGHT) ||
                (next.direction === Direction.LEFT && next.next.direction === Direction.DOWN)) {
                    // arc down to right
                }
                else if ((next.direction === Direction.DOWN && next.next.direction === Direction.RIGHT) ||
                (next.direction === Direction.LEFT && next.next.direction === Direction.UP)) {
                    // arc right to up
                }
                else if ((next.direction === Direction.DOWN && next.next.direction === Direction.LEFT) ||
                (next.direction === Direction.RIGHT && next.next.direction === Direction.UP)) {
                    // arc up to left
                }
            }

            next = next.next;
        }


        switch(this.head.direction) {
            case Direction.UP:
                    draw.Rectangle(75, 87.5, [this.head.pos[0], this.head.pos[1] + 0.125]);
                    break;
            case Direction.DOWN:
                    draw.Rectangle(75, 87.5, [this.head.pos[0], this.head.pos[1] - 0.125])
                    break;
            case Direction.LEFT:
                    draw.Rectangle(87.5, 75, [this.head.pos[0] + 0.125, this.head.pos[1]])
                    break;
            case Direction.RIGHT:
                    draw.Rectangle(87.5, 75, [this.head.pos[0] - 0.125, this.head.pos[1]])
                    break;
        }
    }
}

class SnakePart {
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
}

enum TreasureType {
    APPLE = 'apple'
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
        draw.color = 'crimson';
        draw.Square(50, this.pos);
    }
}