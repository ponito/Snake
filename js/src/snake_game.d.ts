type Grid = {
    width: number
    height: number
    cell_width: number
    cell_height: number
    player: Snake
}

type Position = [number, number]

interface renderable {
    render(): void;
}