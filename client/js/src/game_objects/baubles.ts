class Apple implements GameObject {
    pos: Position

    constructor(pos: Position) {
        this.pos = pos;
    }

    onCollision(other: Snake, world: Grid) {
        console.log('dispatched event.');
        GRID.dispatchEvent({
            target: other,
            type: 'atefood',
            eaten: this,
        } as AteFoodEvent);
    }

    render(): void {
        draw.color = 'crimson';
        draw.Square(50, this.pos);
    }
}

class GoldPot implements GameObject  {
    pos: Position

    constructor(pos: Position) {
        this.pos = pos;
    }

    onCollision(other: Snake, world: Grid) {
        throw new Error("Method not implemented.");
    }

    render(): void {
        throw new Error("Can't render Pot o' Gold because of missing implementation.");
    }
}

class Barrier implements GameObject {
    pos: Position

    constructor(pos: Position) {
        this.pos = pos;
    }

    onCollision(other: Snake, world: Grid) {
        throw new Error("Method not implemented.");
    }

    render(): void {
        draw.color = 'gray';
        draw.Square(1, this.pos);
    }
}