type Position = [number, number]
type Offset = [number, number]
type Quarter = 'top-left' | 'top-right' | 'bot-left' | 'bot-right'

// rendering types

interface renderable { render(): void }

interface GameObject extends renderable {
    pos: Position

    onCollision(other: Snake, world: Grid): any
}

// event types

interface GridEvent {
    target: Snake,
    type: keyof GridEventMap,
}

interface AteFoodEvent extends GridEvent {
    eaten: Apple
    // ...
}

interface PlayerDeathEvent extends GridEvent {
    // ...
}

interface DirectionChangeEvent extends GridEvent {
    
}

interface GridEventMap {
    'atefood': AteFoodEvent,
    'playerdied': PlayerDeathEvent,
    'directionchange': DirectionChangeEvent,
}

interface GridEventListener<T extends GridEvent> {
    (this: Grid, ev: T): any
}