function onKeydown(ev: KeyboardEvent) {
    switch (ev.key) {
        case 'ArrowUp':
            if (GRID.player.direction != Direction.DOWN)
                GRID.player.direction = Direction.UP;
            break;
        case 'ArrowLeft':
            if (GRID.player.direction != Direction.RIGHT)
            GRID.player.direction = Direction.LEFT;
            break;
        case 'ArrowDown':
            if (GRID.player.direction != Direction.UP)
            GRID.player.direction = Direction.DOWN;
            break;
        case 'ArrowRight':
            if (GRID.player.direction != Direction.LEFT)
            GRID.player.direction = Direction.RIGHT;
            break;
    }
}