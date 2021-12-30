function onKeydown(ev: KeyboardEvent) {
    switch (ev.key) {
        case 'ArrowUp':
            GRID.player.nextDirection = Direction.UP;
            break;
        case 'ArrowLeft':
            GRID.player.nextDirection = Direction.LEFT;
            break;
        case 'ArrowDown':
            GRID.player.nextDirection = Direction.DOWN;
            break;
        case 'ArrowRight':
            GRID.player.nextDirection = Direction.RIGHT;
            break;
    }
}