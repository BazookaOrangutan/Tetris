class Field {
    block;
    constructor() {
        this.piece = null;
    }

    reset() {
        this.game = this.getEmptyField();
    }

    getEmptyField() {
        return FIELD;
    }

    insideWalls(x) {
        return x >= 0 && x < COLS;
    }

    aboveFloor(y) {
        return y <= ROWS;
    }

    notOccupied(x, y) {
        return this.grid[y] && this.grid[y][x] === 0;
    }

    valid(p) {
        return p.shape.every((row, dy) => {
            return row.every((value, dx) => {
                let x = p.x + dx;
                let y = p.y + dy;
                return value === 0 ||
                    (this.insideWalls(x) && this.aboveFloor(y) && this.notOccupied(x, y));
            });
        });
    }

    rotate(block) {
        // Clone with JSON for immutability.
        let p = JSON.parse(JSON.stringify(block));

        // Transpose matrix
        for (let y = 0; y < p.shape.length; ++y) {
            for (let x = 0; x < y; ++x) {
                [p.shape[x][y], p.shape[y][x]] = [p.shape[y][x], p.shape[x][y]];
            }
        }

        // Reverse the order of the columns.
        p.shape.forEach(row => row.reverse());
        return p;
    }



}