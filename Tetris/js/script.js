

// const field = document.querySelector('.field');





// for (let x = 0; x < sizeX; x++) {
//     const line = document.createElement('div');
//     for (let y = 0; y < sizeY; y++) {
//         const block = document.createElement('div');
//         block.classList.add('field__block');
//         line.appendChild(block);
//     }
//     line.classList.add('.field__line')
//     field.appendChild(line);
// }

// Map

// map = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],]

const canvas = document.getElementById('field');
const context = canvas.getContext('2d');
context.canvas.width = COLS * BLOCK_SIZE;
context.canvas.height = ROWS * BLOCK_SIZE;
const canvasNext = document.getElementById('next');
const ctxNext = canvasNext.getContext('2d');
const linesDiv = document.querySelector('.lines');
const scoreDiv = document.querySelector('.score');
const levelDiv = document.querySelector('.level');

for (let x = 0; x < COLS; x++) {
    for (let y = 0; y < ROWS; y++) {
        context.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, 28, 28);
    }
}

const tetrominos = {
    'I': [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ],
    'J': [
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 0],
    ],
    'L': [
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0],
    ],
    'O': [
        [1, 1],
        [1, 1],
    ],
    'S': [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0],
    ],
    'Z': [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0],
    ],
    'T': [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0],
    ]
}

const colors = {
    'I': 'cyan',
    'O': 'yellow',
    'T': 'purple',
    'S': 'green',
    'Z': 'red',
    'J': 'blue',
    'L': 'orange'
};

const grid = 30;

let tetrominoSequence = [];

const nextSequance = [];



// for (let i = 0; i < 3; i++) {
//     nextList.push(sequence[randomType()]);
// }


let playfield = [];
function clear() {
    for (let row = -2; row < ROWS; row++) {
        playfield[row] = [];
        for (let col = 0; col < COLS; col++) {
            playfield[row][col] = 0;
        }
    }
}
clear();



let tetromino = getNextTetromino();

let nextTetromino = getNextTetromino();

let rAF = null;

let gameOver = false;

let animFlag = false





function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateSequence() {
    // тут — сами фигуры
    const sequence = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'];

    while (sequence.length) {
        // случайным образом находим любую из них
        const rand = getRandomInt(0, sequence.length - 1);
        const name = sequence.splice(rand, 1)[0];
        // помещаем выбранную фигуру в игровой массив с последовательностями
        tetrominoSequence.push(name);
    }
}

// function generateNextSequance(){
    
// }


function getNextTetromino() {
    if (tetrominoSequence.length === 0) {
        generateSequence();
    }
    const name = tetrominoSequence.pop();
    // const name = nextList.pop();
    const matrix = tetrominos[name];

    const col = playfield[0].length / 2 - Math.ceil(matrix[0].length / 2);

    // I начинает с 21 строки (смещение -1), а все остальные — со строки 22 (смещение -2)
    const row = name === 'I' ? -1 : -2;

    return {
        name: name,      // название фигуры (L, O, и т.д.)
        matrix: matrix,  // матрица с фигурой
        row: row,        // текущая строка (фигуры стартую за видимой областью холста)
        col: col         // текущий столбец
    };
}

function rotate(matrix) {
    const N = matrix.length - 1;
    const result = matrix.map((row, i) =>
        row.map((val, j) => matrix[N - j][i])
    );
    // на входе матрица, и на выходе тоже отдаём матрицу
    return result;
}

function isValidMove(matrix, cellRow, cellCol) {
    // проверяем все строки и столбцы
    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[row].length; col++) {
            if (matrix[row][col] && (
                // если выходит за границы поля…
                cellCol + col < 0 ||
                cellCol + col >= playfield[0].length ||
                cellRow + row >= playfield.length ||
                // …или пересекается с другими фигурами
                playfield[cellRow + row][cellCol + col])
            ) {
                // то возвращаем, что нет, так не пойдёт
                return false;
            }
        }
    }
    // а если мы дошли до этого момента и не закончили раньше — то всё в порядке
    return true;
}

// когда фигура окончательна встала на своё место
function placeTetromino() {
    // обрабатываем все строки и столбцы в игровом поле
    for (let row = 0; row < tetromino.matrix.length; row++) {
        for (let col = 0; col < tetromino.matrix[row].length; col++) {
            if (tetromino.matrix[row][col]) {
                console.log(tetromino.row);
                console.log(tetromino.col);
                // если край фигуры после установки вылезает за границы поля, то игра закончилась
                if (tetromino.row + row < 0) {
                    return showGameOver();
                }
                // если всё в порядке, то записываем в массив игрового поля нашу фигуру
                playfield[tetromino.row + row][tetromino.col + col] = tetromino.name;
            }
        }
    }
    // проверяем, чтобы заполненные ряды очистились снизу вверх
    let lineCount = 0;
    for (let row = playfield.length - 1; row >= 0;) {
        // если ряд заполнен
        if (playfield[row].every(cell => !!cell)) {
            lines++;
            lineCount++;
            linesDiv.textContent = 'Lines: ' + lines;
            lines % 5 == 0 ? level++ : level += 0;
            if (lines % 5 === 0){
                level++;
                speed += 0.5;
            }
            levelDiv.textContent = 'Level: ' + level;
            // очищаем его и опускаем всё вниз на одну клетку
            for (let r = row; r >= 0; r--) {
                for (let c = 0; c < playfield[r].length; c++) {
                    playfield[r][c] = playfield[r - 1][c];
                }
            }
        }
        else {
            // переходим к следующему ряду
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

    // получаем следующую фигуру
    tetromino = getNextTetromino();
    console.log(playfield);
}

// показываем надпись Game Over
function showGameOver() {
    // прекращаем всю анимацию игры
    cancelAnimationFrame(rAF);
    animFlag = false;
    // ставим флаг окончания
    gameOver = true;
    // рисуем чёрный прямоугольник посередине поля
    context.fillStyle = 'black';
    context.globalAlpha = 0.75;
    context.fillRect(0, canvas.height / 2 - 30, canvas.width, 60);
    // пишем надпись белым моноширинным шрифтом по центру
    context.globalAlpha = 1;
    context.fillStyle = 'white';
    context.font = '50px EightBits';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText('GAME OVER!', canvas.width / 2, canvas.height / 2);

}

let pauseFlag = false

function showPause() {
    cancelAnimationFrame(rAF);
    pauseFlag = true;
    context.fillStyle = 'black';
    context.globalAlpha = 0.75;
    context.fillRect(0, canvas.height / 2 - 30, canvas.width, 60);
    // пишем надпись белым моноширинным шрифтом по центру
    context.globalAlpha = 1;
    context.fillStyle = 'white';
    context.font = '50px EightBits';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText('PAUSE', canvas.width / 2, canvas.height / 2);
}

function removePause() {
    rAF = requestAnimationFrame(loop);
    pauseFlag = false;
}

// главный цикл игры
function loop() {
    // начинаем анимацию
    rAF = requestAnimationFrame(loop);
    // очищаем холст
    context.clearRect(0, 0, canvas.width, canvas.height);

    for (let x = 0; x < COLS; x++) {
        for (let y = 0; y < ROWS; y++) {
            context.fillStyle = 'black';
            context.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, 28, 28);
        }
    }

    // рисуем игровое поле с учётом заполненных фигур
    for (let row = 0; row < 20; row++) {
        for (let col = 0; col < 10; col++) {
            if (playfield[row][col]) {
                const name = playfield[row][col];
                context.fillStyle = colors[name];

                // рисуем всё на один пиксель меньше, чтобы получился эффект «в клетку»
                context.fillRect(col * grid - 0.5, row * grid - 0.5, grid - 1, grid - 1);
            }
        }
    }

    // рисуем текущую фигуру
    if (tetromino) {

        // фигура сдвигается вниз каждые 35 кадров
        count += speed
        if (count > 35) {
            tetromino.row++;
            count = 0;

            // если движение закончилось — рисуем фигуру в поле и проверяем, можно ли удалить строки
            if (!isValidMove(tetromino.matrix, tetromino.row, tetromino.col)) {
                tetromino.row--;
                placeTetromino();
            }
        }

        // не забываем про цвет текущей фигуры
        context.fillStyle = colors[tetromino.name];

        // отрисовываем её
        for (let row = 0; row < tetromino.matrix.length; row++) {
            for (let col = 0; col < tetromino.matrix[row].length; col++) {
                if (tetromino.matrix[row][col]) {

                    // и снова рисуем на один пиксель меньше
                    context.fillRect((tetromino.col + col) * grid - 0.5, (tetromino.row + row) * grid - 0.5, grid - 1, grid - 1);
                }
            }
        }
    }
}

// следим за нажатиями на клавиши
document.addEventListener('keydown', (e) => {
    // если игра закончилась — сразу выходим
    if (gameOver) return;

    if (pauseFlag === false) {
        // стрелки влево и вправо
        if (e.which === 37 || e.which === 39) {
            const col = e.which === 37
                // если влево, то уменьшаем индекс в столбце, если вправо — увеличиваем
                ? tetromino.col - 1
                : tetromino.col + 1;

            // если так ходить можно, то запоминаем текущее положение 
            if (isValidMove(tetromino.matrix, tetromino.row, col)) {
                tetromino.col = col;
            }
        }

        // стрелка вверх — поворот
        if (e.which === 38) {
            // поворачиваем фигуру на 90 градусов
            const matrix = rotate(tetromino.matrix);
            // если так ходить можно — запоминаем
            if (isValidMove(matrix, tetromino.row, tetromino.col)) {
                tetromino.matrix = matrix;
            }
        }

        // стрелка вниз — ускорить падение
        if (e.which === 40) {
            // смещаем фигуру на строку вниз
            const row = tetromino.row + 1;
            score++;
            scoreDiv.textContent = 'Score: ' + score;
            // если опускаться больше некуда — запоминаем новое положение
            if (!isValidMove(tetromino.matrix, row, tetromino.col)) {
                tetromino.row = row - 1;
                // ставим на место и смотрим на заполненные ряды
                placeTetromino();
                return;
            }
            // запоминаем строку, куда стала фигура
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
    tetromino = getNextTetromino();
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
}


console.log(playfield);













// ctx.scale(BLOCK_SIZE, BLOCK_SIZE);

// let field = new Field();

// function play() {
//     field.reset();
//     let block = new Block(ctx);
//     block.draw();
//     field.block = block;
// }

// const moves = {
//     [KEY.SPACE]: p => ({ ...p, y: p.y + 1 }),
//     [KEY.LEFT]: p => ({ ...p, x: p.x - 1 }),
//     [KEY.UP]: (p) => field.rotate(p),
//     [KEY.RIGHT]: p => ({ ...p, x: p.x + 1 }),
//     [KEY.DOWN]: p => ({ ...p, y: p.y + 1 })
// };

// document.addEventListener('keydown', event => {
//     if (moves[event.keyCode]) {
//         // отмена действий по умолчанию
//         event.preventDefault();

//         // получение новых координат фигурки
//         let p = moves[event.keyCode](field.block);
//         if (event.keyCode === KEY.SPACE) {
//             // Жесткое падение
//             while (field.valid(p)) {
//                 field.block.move(p);

//                 // стирание старого отображения фигуры на холсте
//                 ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
//                 field.block.draw();

//                 p = moves[KEY.DOWN](field.block);
//             }
//         } else if(field.valid(p)) {
//             // реальное перемещение фигурки, если новое положение допустимо
//             field.block.move(p);

//             // стирание старого отображения фигуры на холсте
//             ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

//             field.block.draw();
//         }
//     }
// });

// Blocks



// const colors = {
//     'I': 'cyan',
//     'O': 'yellow',
//     'T': 'purple',
//     'S': 'green',
//     'Z': 'red',
//     'J': 'blue',
//     'L': 'orange'
// };


// const field = new Field();