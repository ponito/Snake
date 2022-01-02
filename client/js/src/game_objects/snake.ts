class Snake implements renderable {
    length: number
    score: number

    head: SnakePart
    tail: SnakePart

    direction: Direction = Direction.UP;
    nextDirection: Direction = this.direction;

    growListener: GridEventListener<AteFoodEvent>
    deathListener: GridEventListener<PlayerDeathEvent>

    movement: number;

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

        this.growListener = GRID.addEventListener('atefood', ev => { if (ev.target === this) this.grow(); })
        this.deathListener = GRID.addEventListener('playerdied', ev => {
            GRID.removeEventListener('atefood', this.growListener);
            GRID.removeEventListener('playerdied', this.deathListener);
        })
    }

    blocksTile(pos: Position) {
        let next = this.tail;
        while (next !== null) {
            if (next.pos[0] == pos[0] && next.pos[1] == pos[1]) {
                next = null;
                return true;
            }

            next = next.next;
        }

        return false;
    }

    move() {
        this.direction = this.nextDirection;
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

        if (this.blocksTile(newPos)) {
            GRID.dispatchEvent({
                target: this,
                type: 'playerdied'
            });
        }

        const newHead = this.tail;
        this.tail = newHead.next;
        newHead.next = null;
        this.head.next = newHead;
        this.head = newHead;
        newHead.pos = newPos;

        newHead.direction = this.direction;

        const t = GRID.objects.find(t => t.pos[0] == newPos[0] && t.pos[1] == newPos[1])
        if (t) t.onCollision(this, GRID);
    }

    grow(addedParts = 1) {
        while (addedParts > 0) {
            const newTail = new SnakePart(this.tail);
            this.tail = newTail;
            addedParts -= 1;
        }
    }

    controller = (ev: KeyboardEvent) => {
        switch (ev.key) {
            case 'ArrowUp':
                if (GRID.player.direction != Direction.DOWN) { GRID.player.nextDirection = Direction.UP };
                break;
            case 'ArrowLeft':
                if (GRID.player.direction != Direction.RIGHT) { GRID.player.nextDirection = Direction.LEFT };
                break;
            case 'ArrowDown':
                if (GRID.player.direction != Direction.UP) { GRID.player.nextDirection = Direction.DOWN };
                break;
            case 'ArrowRight':
                if (GRID.player.direction != Direction.LEFT) { GRID.player.nextDirection = Direction.RIGHT };
                break;
        };
    }

    render(): void {
        draw.color = "dodgerblue";
        switch (this.tail.next.direction) {
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
        while (next !== this.head) {
            if (next.direction === next.next.direction) {
                switch (next.next.direction) {
                    case Direction.UP:
                        draw.Rectangle(75, 100, next.pos);
                        break;
                    case Direction.DOWN:
                        draw.Rectangle(75, 100, next.pos)
                        break;
                    case Direction.LEFT:
                        draw.Rectangle(100, 75, next.pos)
                        break;
                    case Direction.RIGHT:
                        draw.Rectangle(100, 75, next.pos)
                        break;
                }
            }
            else {
                if ((next.direction === Direction.UP && next.next.direction === Direction.LEFT) ||
                    (next.direction === Direction.RIGHT && next.next.direction === Direction.DOWN)) {
                    // arc left to down
                    draw.RingQuarter(75, 'bot-left', next.pos);
                }
                else if ((next.direction === Direction.UP && next.next.direction === Direction.RIGHT) ||
                    (next.direction === Direction.LEFT && next.next.direction === Direction.DOWN)) {
                    // arc down to right
                    draw.RingQuarter(75, 'bot-right', next.pos);
                }
                else if ((next.direction === Direction.DOWN && next.next.direction === Direction.RIGHT) ||
                    (next.direction === Direction.LEFT && next.next.direction === Direction.UP)) {
                    // arc right to up
                    draw.RingQuarter(75, 'top-right', next.pos);
                }
                else if ((next.direction === Direction.DOWN && next.next.direction === Direction.LEFT) ||
                    (next.direction === Direction.RIGHT && next.next.direction === Direction.UP)) {
                    // arc up to left
                    draw.RingQuarter(75, 'top-left', next.pos);
                }
            }

            next = next.next;
        }


        switch (this.head.direction) {
            case Direction.UP:
                draw.Rectangle(75, 87.5, [this.head.pos[0], this.head.pos[1] + 0.125]);
                draw.color = "black";
                draw.Rectangle(10, 10, [this.head.pos[0] - 0.375 / 2, this.head.pos[1]]);
                draw.Rectangle(10, 10, [this.head.pos[0] + 0.375 / 2, this.head.pos[1]]);
                draw.color = "dodgerblue";
                break;
            case Direction.DOWN:
                draw.Rectangle(75, 87.5, [this.head.pos[0], this.head.pos[1] - 0.125])
                draw.color = "black";
                draw.Rectangle(10, 10, [this.head.pos[0] - 0.375 / 2, this.head.pos[1]]);
                draw.Rectangle(10, 10, [this.head.pos[0] + 0.375 / 2, this.head.pos[1]]);
                draw.color = "dodgerblue";
                break;
            case Direction.LEFT:
                draw.Rectangle(87.5, 75, [this.head.pos[0] + 0.125, this.head.pos[1]])
                draw.color = "black";
                draw.Rectangle(10, 10, [this.head.pos[0], this.head.pos[1] - 0.375 / 2]);
                draw.Rectangle(10, 10, [this.head.pos[0], this.head.pos[1] + 0.375 / 2]);
                draw.color = "dodgerblue";
                break;
            case Direction.RIGHT:
                draw.Rectangle(87.5, 75, [this.head.pos[0] - 0.125, this.head.pos[1]])
                draw.color = "black";
                draw.Rectangle(10, 10, [this.head.pos[0], this.head.pos[1] - 0.375 / 2]);
                draw.Rectangle(10, 10, [this.head.pos[0], this.head.pos[1] + 0.375 / 2]);
                draw.color = "dodgerblue";
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