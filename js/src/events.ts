const event_listeners: SnakeGameEventListenerMap = {
    'atefood': [],
    'playerdied': [],
};


function addEventListener<K extends keyof SnakeGameEventMap>(type: K, listener: (ev: SnakeGameEventMap[K]) => any): void {
    event_listeners[type].push(listener);
}

function removeEventListener<K extends keyof SnakeGameEventMap>(type: K, listener: (ev: SnakeGameEventMap[K]) => any): void {
    const i = event_listeners[type].findIndex(l => l === listener);
    event_listeners[type].slice(i, i + 1);
}

function dispatchEvent(event: SnakeGameEvent): void {
    const listeners: ((this: Grid, ev: SnakeGameEvent) => any)[] = event_listeners[event.type]
    listeners.forEach(l => l.call(GRID, event));
}