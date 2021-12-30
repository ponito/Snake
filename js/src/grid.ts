class GridNew implements renderable {
    width : number;
    height : number;

    cellsizeX : number;
    cellsizeY : number;

    chars : Snake[];
    treasures : Treasure[];
    walls : [];

    // addChar() {
    //     this.chars.push(new Snake());
    // }
    // addTreasure(type, x : number, y : number) {
    //     this.treasures.push(new Treasure([x, y]));
    // }

    constructor(cellsizeX : number, cellsizeY : number) {
        this.cellsizeX = cellsizeX;
        this.cellsizeY = cellsizeY;

        this.width = canvas.width / this.cellsizeX;
        this.height = canvas.height / this.cellsizeY;

        // this.addChar();
        // this.addTreasure("apple", floor(this.width / 2), floor(this.height / 2) - 2);
        this.chars.push(new Snake());
        this.treasures.push(new Treasure([floor(this.width / 2), floor(this.height / 2) - 2]));
    }

    update() {

    }

    render() {
        for (const c of this.chars) {
            c.render();
        }
        for (const t of this.treasures) {
            t.render();
        }
        //for (const w of this.walls) {
        //    w[i].render();
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