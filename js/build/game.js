const floor = Math.floor;
var Direction;

(function (Direction) {
  Direction["UP"] = "up";
  Direction["DOWN"] = "down";
  Direction["LEFT"] = "left";
  Direction["RIGHT"] = "right";
})(Direction || (Direction = {}));

class Snake {
  constructor() {
    this.head = new SnakeHead();
  }

  render() {
    this.head.tail.render();
  }

}

class SnakeHead {
  length = 3;
  score = 0;
  pos = [floor(GLOBALS.grid.cells_x / 2), floor(GLOBALS.grid.cells_y / 2)];
  direction = Direction.UP;

  constructor() {
    let next = this.neck = new SnakeBody(this);
    let current;
    let length = this.length;

    while (--length > 0) {
      current = new SnakeBody(next);
      next = current;
      console.log(`l: ${length}`);
    }

    this.tail = current;
  }

  move(direction) {
    const [x, y] = this.pos;
    let newPos;

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

    const t = GLOBALS.treasures.find(t => t.pos == newPos);
    if (t) this.consume(t);
    this.direction = direction;
    this.pos = newPos; // TODO (check out of bounds) Lose game when leaving grid
  }

  consume(t) {
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

  render() {
    const [x, y] = this.pos;
    ctx.fillStyle = 'dodgerblue';
    ctx.fillRect(x * GLOBALS.grid.cellsizeX + GLOBALS.grid.cellsizeX / 10, y * GLOBALS.grid.cellsizeY + GLOBALS.grid.cellsizeX / 10, GLOBALS.grid.cellsizeX * 0.8, GLOBALS.grid.cellsizeY * 0.8);
  }

}

class SnakeBody {
  constructor(next, direction = next.direction) {
    this.next = next;
    const [x, y] = next.pos;

    switch (direction) {
      case Direction.UP:
        this.pos = [x, y - 1];
        break;

      case Direction.DOWN:
        this.pos = [x, y + 1];
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

  render() {
    const [x, y] = this.pos;
    ctx.fillStyle = 'dodgerblue';
    ctx.fillRect(x * GLOBALS.grid.cellsizeX + GLOBALS.grid.cellsizeX / 5, y * GLOBALS.grid.cellsizeY + GLOBALS.grid.cellsizeX / 5, GLOBALS.grid.cellsizeX * 0.6, GLOBALS.grid.cellsizeY * 0.6);
    this.next.render();
  }

}

class Treasure {
  type = 'apple';

  constructor(pos, type = 'apple') {
    this.type = type;
  }

  render() {}

}

function setGridSize(cells_x, cells_y) {
  GLOBALS.grid = {
    cells_x,
    cells_y,
    cellsizeX: canvas.width / cells_x,
    cellsizeY: canvas.height / cells_y
  };
}