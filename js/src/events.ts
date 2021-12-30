const EventListeners = {
    _listeners: {
        'atefood': [],
        'playerdied': [],
    },

    add: function <K extends keyof SnakeGameEventMap>(type: K, listener: (ev: SnakeGameEventMap[K]) => any): void {
        EventListeners._listeners[type].push(listener);
    },

    remove: function <K extends keyof SnakeGameEventMap>(type: K, listener: (ev: SnakeGameEventMap[K]) => any): void {
        const i = EventListeners._listeners[type].findIndex(l => l === listener);
        EventListeners._listeners[type].slice(i, i + 1);
    },

    dispatchEvent: function (event: SnakeGameEvent): void {
        const listeners: ((this: Grid, ev: SnakeGameEvent) => any)[] = EventListeners._listeners[event.type]
        listeners.forEach(l => l.call(GRID, event));
    }
}