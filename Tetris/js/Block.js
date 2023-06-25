class Block {
    ctx;
    color;
    // url;
    shape;
    x = 0;
    y = 0;
    type;

    constructor(ctx) {
        this.ctx = ctx;
        this.type = this.randomType();
        this.color = COLORS[this.type];
        this.shape = BLOCKS[this.type];
    }

    randomType() {
        return Math.floor(Math.random() * 8);
    }

    draw() {
        this.ctx.fillStyle = this.color;
        this.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value > 0) {
                    this.ctx.fillRect(this.x + x, this.y + y, 1, 1);
                }
            });
        });
    }

    move(p) {
        this.x = p.x;
        this.y = p.y;
    }
}