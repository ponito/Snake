const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

class Grid {
    width: number
    height: number
    cell_size: number

    objects: GameObject[];
    snakes: renderable[];

    player: Snake

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.cell_size = canvas.width / width;
    }

    reset() {
        this.objects = []
        this.snakes = []

        this.snakes.push(this.player = new Snake());
        this.objects.push(new Apple([
            floor(this.width / 2),
            floor(this.height / 2) - 2
        ]));
    }

    listeners = {
        'atefood': [],
        'playerdied': [],
        'directionchange': []
    }

    addEventListener<K extends keyof GridEventMap>(type: K, listener: GridEventListener<GridEventMap[K]>) {
        this.listeners[type].push(listener);
        return listener;
    }

    removeEventListener<K extends keyof GridEventMap>(type: K, listener: GridEventListener<GridEventMap[K]>): void {
        const i = this.listeners[type].findIndex(l => l === listener);
        this.listeners[type].slice(i, i + 1);
    }

    dispatchEvent(event: GridEvent): void {
        const ls: ((this: Grid, ev: GridEvent) => any)[] = this.listeners[event.type]
        ls.forEach(l => l.call(GRID, event));
    }
}

function init() {
    GRID.reset();

    window.addEventListener('keydown', GRID.player.controller);

    GRID.addEventListener('atefood', (ev) => {
        const i = GRID.objects.findIndex((v: GameObject) => v === ev.eaten);
        GRID.objects.splice(i, i + 1);

        let newPos: Position = [randInt(GRID.width - 1), randInt(GRID.height - 1)];
        while (ev.target.blocksTile(newPos)) {
            newPos = [randInt(GRID.width - 1), randInt(GRID.height - 1)];
        }
        GRID.objects.push(new Apple(newPos));
    });

    GRID.addEventListener('playerdied', () => GRID.reset());

    this.movement = setInterval(() => {
        GRID.player.move();
    }, 250);

    refit();

    ctx.beginPath();
};

const GRID = new Grid(15, 15);

init();
updateFrames();