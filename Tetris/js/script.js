const canvas = document.getElementById('field');
const ctx = canvas.getContext('2d');
ctx.canvas.width = COLS * BLOCK_SIZE;
ctx.canvas.height = ROWS * BLOCK_SIZE;

const canvasNext = document.getElementById('next');
const ctxNext = canvasNext.getContext('2d');
ctxNext.canvas.width = 230;
ctxNext.canvas.height = 370;

const linesDiv = document.querySelector('.lines');
const scoreDiv = document.querySelector('.score');
const levelDiv = document.querySelector('.level');

const playButton = document.querySelector('.retry');

let tetrominoSequence = [];

let playfield = [];


function createCells() {
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            ctx.fillStyle = 'black';
            ctx.fillRect(col * BLOCK_SIZE, row * BLOCK_SIZE, BLOCK_SIZE - 2, BLOCK_SIZE - 2);
        }
    }
}

createCells();


function clear() {
    for (let row = -2; row < ROWS; row++) {
        playfield[row] = [];
        for (let col = 0; col < COLS; col++) {
            playfield[row][col] = 0;
        }
    }
}

clear();


let nextTetromino = getNextTetromino();
let gameOver = false;
let animFlag = false;


function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateSequence() {
    const sequence = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'];
    while (sequence.length) {
        const rand = getRandom(0, sequence.length - 1);
        const name = sequence.splice(rand, 1)[0];
        tetrominoSequence.push(name);
    }
}

function getNextTetromino() {
    if (tetrominoSequence.length === 0) {
        generateSequence();
    }
    const name = tetrominoSequence.pop();
    const matrix = TETROMINOS[name];

    const col = playfield[0].length / 2 - Math.ceil(matrix[0].length / 2);

    const row = -2;

    return {
        name: name,      
        matrix: matrix,  
        row: row,        
        col: col         
    };
}

function rotate(matrix) {
    const N = matrix.length - 1;
    const result = matrix.map((row, i) =>
        row.map((val, j) => matrix[N - j][i])
    );
    return result;
}

function isValidMove(matrix, cellRow, cellCol) {
    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[row].length; col++) {
            if (matrix[row][col] && ( cellCol + col < 0 || cellCol + col >= playfield[0].length || cellRow + row >= playfield.length || playfield[cellRow + row][cellCol + col])) {
                return false;
            }
        }
    }
    return true;
}


function placeTetromino() {
    for (let row = 0; row < tetromino.matrix.length; row++) {
        for (let col = 0; col < tetromino.matrix[row].length; col++) {
            if (tetromino.matrix[row][col]) {
                console.log(tetromino.row);
                console.log(tetromino.col);
                if (tetromino.row + row < 0) {
                    return showGameOver();
                }
                playfield[tetromino.row + row][tetromino.col + col] = tetromino.name;
            }
        }
    }

    let lineCount = 0;
    for (let row = playfield.length - 1; row >= 0;) {
        if (playfield[row].every(cell => !!cell)) {
            lines++;
            lineCount++;
            linesDiv.textContent = 'Lines: ' + lines;
            lines % 5 == 0 ? level++ : level += 0;
            if (lines % 5 === 0) {
                level++;
                speed += 0.5;
            }
            levelDiv.textContent = 'Level: ' + level;
            for (let r = row; r >= 0; r--) {
                for (let c = 0; c < playfield[r].length; c++) {
                    playfield[r][c] = playfield[r - 1][c];
                }
            }
        }
        else {
            row--;
        }
    }

    switch (lineCount) {
        case 1:
            score += 100;
            scoreDiv.textContent = 'Score: ' + score;
            break;
        case 2:
            score += 300;
            scoreDiv.textContent = 'Score: ' + score;
            break;
        case 3:
            score += 700;
            scoreDiv.textContent = 'Score: ' + score;
            break;
        case 4:
            score += 1500;
            scoreDiv.textContent = 'Score: ' + score;
            break;
    }

    tetromino = nextTetromino;
    nextTetromino = getNextTetromino();
    console.log(playfield);
}


function showGameOver() {
    cancelAnimationFrame(rAF);
    animFlag = false;
    gameOver = true;
    ctx.fillStyle = 'black';
    ctx.globalAlpha = 0.75;
    ctx.fillRect(0, canvas.height / 2 - 30, canvas.width - 2, 58);
    ctx.globalAlpha = 1;
    ctx.fillStyle = 'white';
    ctx.font = '50px EightBits';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('GAME OVER!', canvas.width / 2, canvas.height / 2 - 2);

}

let pauseFlag = false

function showPause() {
    cancelAnimationFrame(rAF);
    pauseFlag = true;
    ctx.fillStyle = 'black';
    ctx.globalAlpha = 0.75;
    ctx.fillRect(0, canvas.height / 2 - 30, canvas.width - 2, 58);
    ctx.globalAlpha = 1;
    ctx.fillStyle = 'white';
    ctx.font = '50px EightBits';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('PAUSE', canvas.width / 2, canvas.height / 2 - 2);
}

function removePause() {
    rAF = requestAnimationFrame(loop);
    pauseFlag = false;
}

function loop() {
    rAF = requestAnimationFrame(loop);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    createCells();
    for (let row = 0; row < 20; row++) {
        for (let col = 0; col < 10; col++) {
            if (playfield[row][col]) {
                const name = playfield[row][col];
                ctx.fillStyle = COLORS[name];
                ctx.fillRect(col * BLOCK_SIZE - 0.5, row * BLOCK_SIZE - 0.5, BLOCK_SIZE - 1, BLOCK_SIZE - 1);
            }
        }
    }


    ctxNext.clearRect(0, 0, canvasNext.width, canvasNext.height);

    if (nextTetromino) {
        ctxNext.fillStyle = COLORS[nextTetromino.name];
        for (let row = 0; row < nextTetromino.matrix.length; row++) {
            for (let col = 0; col < nextTetromino.matrix[row].length; col++) {
                if (nextTetromino.matrix[row][col]) {
                    if (nextTetromino.name === 'O') ctxNext.fillRect((col) * BLOCK_SIZE_NEXT + canvasNext.width / 2 - 33, (row) * BLOCK_SIZE_NEXT + canvasNext.height / 2 - 33, BLOCK_SIZE_NEXT - 1, BLOCK_SIZE_NEXT - 1);
                    else if (nextTetromino.name === 'I') ctxNext.fillRect((col) * BLOCK_SIZE_NEXT + canvasNext.width / 2 - 67, (row) * BLOCK_SIZE_NEXT + canvasNext.height / 2 - 55, BLOCK_SIZE_NEXT - 1, BLOCK_SIZE_NEXT - 1);
                    else ctxNext.fillRect((col) * BLOCK_SIZE_NEXT + canvasNext.width / 2 - 50, (row) * BLOCK_SIZE_NEXT + canvasNext.height / 2 - 40, BLOCK_SIZE_NEXT - 1, BLOCK_SIZE_NEXT - 1);
                }
            }
        }
    }

    if (tetromino) {
        
        count += speed
        if (count > 35) {
            tetromino.row++;
            count = 0;
            if (!isValidMove(tetromino.matrix, tetromino.row, tetromino.col)) {
                tetromino.row--;
                placeTetromino();
            }
        }

        ctx.fillStyle = COLORS[tetromino.name];

        for (let row = 0; row < tetromino.matrix.length; row++) {
            for (let col = 0; col < tetromino.matrix[row].length; col++) {
                if (tetromino.matrix[row][col]) {
                    ctx.fillRect((tetromino.col + col) * BLOCK_SIZE - 0.5, (tetromino.row + row) * BLOCK_SIZE - 0.5, BLOCK_SIZE - 1, BLOCK_SIZE - 1);
                }
            }
        }
    }
}

document.addEventListener('keydown', (e) => {
    if (gameOver) return;

    if (pauseFlag === false) {

        if (e.which === 37 || e.which === 39) {
            const col = e.which === 37 ? tetromino.col - 1 : tetromino.col + 1;
            if (isValidMove(tetromino.matrix, tetromino.row, col)) {
                tetromino.col = col;
            }
        }

        if (e.which === 38) {
            const matrix = rotate(tetromino.matrix);
            if (isValidMove(matrix, tetromino.row, tetromino.col)) {
                tetromino.matrix = matrix;
            }
        }

        if (e.which === 40) {
            const row = tetromino.row + 1;
            score++;
            scoreDiv.textContent = 'Score: ' + score;
            if (!isValidMove(tetromino.matrix, row, tetromino.col)) {
                tetromino.row = row - 1;
                placeTetromino();
                return;
            }
            tetromino.row = row;
        }
        if (e.which === 32) {
            let row = tetromino.row
            while (isValidMove(tetromino.matrix, row, tetromino.col)) {
                row++;
                score += 2;
                scoreDiv.textContent = 'Score: ' + score;
            }
            tetromino.row = row - 1;
            placeTetromino();
            return;
        }

    }
    if ((e.which === 80 || e.which === 27) && animFlag === true) {
        if (pauseFlag) removePause();
        else showPause();
    }
});

function play() {
    clear();
    if (!animFlag || pauseFlag) {
        rAF = requestAnimationFrame(loop);
        animFlag = true;
        pauseFlag = false;
    }
    tetromino = nextTetromino;
    nextTetromino = getNextTetromino();
    count = 0;
    gameOver = false;
    pauseFlag = false;
    lines = 0;
    level = 0;
    score = 0;
    speed = 1;
    linesDiv.textContent = 'Lines: ' + lines;
    levelDiv.textContent = 'Level: ' + level;
    scoreDiv.textContent = 'Score: ' + score;
    playButton.textContent = 'Retry';
}


console.log(playfield);





