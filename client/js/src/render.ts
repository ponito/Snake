const refit = window.onresize = () => {
    const height = (GRID.height / GRID.width) * window.innerWidth

    if (window.innerHeight > height) {
        canvas.style.width = "100%";
        canvas.style.height = "initial";
        canvas.style.top = `calc(50% - ${height + "px"}/2)`;
    } else {
        canvas.style.height = "100%";
        canvas.style.width = "initial";
        canvas.style.top = "initial";
    }
}

const renderBackground = () => {
    draw.color = 'seagreen';
    draw.fill = false;
    for (let x = 0; x < GRID.width; x++) {
        for (let y = 0; y < GRID.height; y++) {
            // Use image?
            draw.Square(100, [x, y])
        }
    }
    draw.fill = true;
    ctx.stroke();
};

const renderBaubles = () => GRID.objects.forEach(b => b.render());

const renderPlayers = () => GRID.snakes.forEach(s => s.render());

const updateFrames = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    renderBackground();
    renderBaubles();
    renderPlayers();
    // renderHUD();

    window.requestAnimationFrame(updateFrames);
}