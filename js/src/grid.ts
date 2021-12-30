class GridNew implements renderable {
    width : number;
    height : number;

    cellsizeX : number;
    cellsizeY : number;

    chars : Snake[];
    treasures : Treasure[];
    walls : [];

    addChar() {
        this.chars.push(new Snake());
    }
    addTreasure(type, x, y) {
        this.treasures.push(new Treasure([x, y]));
    }

    constructor(cellsizeX, cellsizeY) {
        this.cellsizeX = cellsizeX;
        this.cellsizeY = cellsizeY;

        this.width = canvas.width / this.cellsizeX;
        this.height = canvas.height / this.cellsizeY;

        this.addChar();
        this.addTreasure("apple", floor(this.width / 2), floor(this.height / 2) - 2);
    }

    update() {

    }

    render() {
        for (let i = 0; i < this.chars.length; i++) {
            this.chars[i].render();
        }
        for (let i = 0; i < this.treasures.length; i++) {
            this.treasures[i].render();
        }
        //for (let i = 0; i < this.walls.length; i++) {
        //    this.walls[i].render();
        //}
    }
    renderBackground() {
        ctx.beginPath();
        ctx.strokeStyle = 'seagreen'

        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                // Use image?
                ctx.rect(
                    x * this.cellsizeX,
                    y * this.cellsizeY,
                    this.cellsizeX,
                    this.cellsizeY
                );
            }
        }
        ctx.stroke();
    }
}