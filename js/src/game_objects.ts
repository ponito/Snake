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

        const t = TREASURES.find(t => t.pos[0] == newPos[0] && t.pos[1] == newPos[1])
        if (t) this.consume(t);
    }

    consume(t: Treasure) {
        switch (t.type) {
            case TreasureType.APPLE:
                this.grow();
                TREASURES.splice(TREASURES.findIndex((v) => v === t), 1);
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
        switch(this.tail.direction) {
            case Direction.UP:
                    draw.Rectangle(50, 75, [this.tail.pos[0] + 0.25, this.tail.pos[1]])
                    break;
            case Direction.DOWN:
                    draw.Rectangle(50, 75, [this.tail.pos[0] + 0.25, this.tail.pos[1] + 0.25])
                    break;
            case Direction.LEFT:
                    draw.Rectangle(75, 50, [this.tail.pos[0], this.tail.pos[1] + 0.25])
                    break;
            case Direction.RIGHT:
                    draw.Rectangle(75, 50, [this.tail.pos[0] + 0.25, this.tail.pos[1] + 0.25])
                    break;
        }

        let next = this.tail.next;
        while(next !== this.head) {
            draw.Rectangle(100, 100, next.pos);

            next = next.next;
        }

        switch(this.head.direction) {
            case Direction.UP:
                    draw.Rectangle(50, 75, [this.head.pos[0] + 0.25, this.head.pos[1] + 0.25]);
                    break;
            case Direction.DOWN:
                    draw.Rectangle(50, 75, [this.head.pos[0] + 0.25, this.head.pos[1]])
                    break;
            case Direction.LEFT:
                    draw.Rectangle(75, 50, [this.head.pos[0] + 0.25, this.head.pos[1] + 0.25])
                    break;
            case Direction.RIGHT:
                    draw.Rectangle(75, 50, [this.head.pos[0], this.head.pos[1] + 0.25])
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