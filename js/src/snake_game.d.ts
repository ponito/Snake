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

interface SnakeGameEvent {
    target: Snake,
    type: keyof SnakeGameEvent,
}

interface AteFoodEvent extends SnakeGameEvent {
    // ...
}

interface PlayerDeathEvent extends SnakeGameEvent {
    // ...
}

interface SnakeGameEventMap {
    'atefood': AteFoodEvent,
    'playerdied': PlayerDeathEvent,
}

interface SnakeGameEventListener<T extends SnakeGameEvent> {
    (ev: T): any
}

declare function addEventListener<K extends keyof SnakeGameEventMap>(type: K, listener: (ev: SnakeGameEventMap[K]) => any): void
declare function removeEventListener<K extends keyof SnakeGameEventMap>(type: K, listener: (ev: SnakeGameEventMap[K]) => any): void
declare function dispatchEvent(event: SnakeGameEvent): void