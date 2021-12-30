type Grid = {
    width: number
    height: number
    cell_width: number
    cell_height: number
}

type Position = [number, number]

interface renderable {
    render(): void;
}

declare enum Direction {
    UP = 'up',
    DOWN = 'down',
    LEFT = 'left',
    RIGHT = 'right',
}

declare enum TreasureType {
    APPLE = 'apple'
}