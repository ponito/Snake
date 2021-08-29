function main() {
    console.log("Hello World!");

    var canvas = document.getElementById("canvas");
    canvas.width = 200;
    canvas.height = 200;
    var ctx = canvas.getContext("2d");

    for (let y = 0; y < 10; y++) {
        for (let x = 0; x < 10; x++) {
            if ((x + y) % 2 == 0)
                ctx.fillRect(x * 20, y * 20, 20, 20);
        }
    }
}