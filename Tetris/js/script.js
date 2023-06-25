

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
const ctx = canvas.getContext('2d');
ctx.canvas.width = COLS * BLOCK_SIZE;
ctx.canvas.height = ROWS * BLOCK_SIZE;


const canvasNext = document.getElementById('next');
const ctxNext = canvasNext.getContext('2d');
for (let x = 0; x < COLS; x++) {
    for (let y = 0; y < ROWS; y++) {
        ctx.fillRect(x*BLOCK_SIZE, y*BLOCK_SIZE, 28, 28);
        
    }
}

ctx.scale(BLOCK_SIZE, BLOCK_SIZE);

let field = new Field();

function play(){
    field.reset();
    let block = new Block(ctx);
    block.draw();
    field.block = block;
}



// Blocks

// const blocks = {
//     'I': [
//         [0, 0, 0, 0],
//         [0, 0, 0, 0],
//         [1, 1, 1, 1],
//         [0, 0, 0, 0]],
//     'J': [
//         [0, 0, 0],
//         [2, 0, 0],
//         [2, 2, 2]],
//     'L': [
//         [0, 0, 0],
//         [0, 0, 3],
//         [3, 3, 3]],
//     'O': [
//         [4, 4],
//         [4, 4]],
//     'S': [
//         [0, 0, 0],
//         [0, 5, 5],
//         [5, 5, 0]],
//     'Z': [
//         [0, 0, 0],
//         [6, 6, 0],
//         [0, 6, 6]],
//     'T': [
//         [0, 7, 0],
//         [7, 7, 7],
//         [0, 0, 0]]
// }

const colors = {
    'I': 'cyan',
    'O': 'yellow',
    'T': 'purple',
    'S': 'green',
    'Z': 'red',
    'J': 'blue',
    'L': 'orange'
};


// const field = new Field();