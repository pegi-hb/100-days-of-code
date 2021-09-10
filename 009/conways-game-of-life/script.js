const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

const cellSize = 20;
const cellGap = 1;

const columnCount = Math.ceil(width / (cellSize + cellGap));
const rowCount = Math.ceil(height / (cellSize + cellGap));

const liveCellColor = 'gold';
const deadCellColor = '#555';
const backgroundColor = '#222';

function createMatrix() {
    return new Array(rowCount).fill(0).map(() => new Array(columnCount).fill(false));
}

function getLiveNeighborsCount(i, j) {
    let c = 0;

    const klb = i - 1 < 0 ? 0 : i - 1;
    const kub = i + 1 >= rowCount ? rowCount - 1 : i + 1;
    const llb = j - 1 < 0 ? 0 : j - 1;
    const lub = j + 1 >= columnCount ? columnCount - 1 : j + 1;

    for (let k = klb; k <= kub; k++) {
        for (let l = llb; l <= lub; l++) {
            if (!(k === i && l === j) && currentGeneration[k][l]) {
                c++;
            }
        }
    }

    return c;
}

function evolve() {
    const newGeneration = createMatrix();

    for (let i = 0; i < rowCount; i++) {
        for (let j = 0; j < columnCount; j++) {
            const liveNeighborsCount = getLiveNeighborsCount(i, j);
            const cellState = currentGeneration[i][j];

            if (cellState && liveNeighborsCount < 2) {
                newGeneration[i][j] = false;
            } else if (cellState && liveNeighborsCount === 2 || liveNeighborsCount === 3) {
                newGeneration[i][j] = true;
            } else if (cellState && liveNeighborsCount > 3) {
                newGeneration[i][j] = false;
            } else if (!cellState && liveNeighborsCount === 3) {
                newGeneration[i][j] = true;
            }
        }
    }

    currentGeneration = newGeneration;
}

let currentGeneration = createMatrix();

function draw() {
    ctx.clearRect(0, 0, width, height);

    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < rowCount; i++) {
        for (let j = 0; j < columnCount; j++) {
            ctx.fillStyle = currentGeneration[i][j] ? liveCellColor : deadCellColor;

            ctx.fillRect(j * (cellSize + cellGap), i * (cellSize + cellGap), cellSize, cellSize);
        }
    }
}
draw();

function cellModifier(e) {
    if (e.buttons === 1 || e.buttons === 2) {
        const x = e.clientX || e.pageX;
        const y = e.clientY || e.pageY;

        const i = Math.trunc(y / (cellSize + cellGap));
        const j = Math.trunc(x / (cellSize + cellGap));

        currentGeneration[i][j] = e.buttons === 1;

        draw();
    }
}

document.addEventListener('mousemove', cellModifier);
document.addEventListener('mousedown', cellModifier);
document.addEventListener('contextmenu', e => e.preventDefault());

function tick() {
    evolve();
    draw();
}
let interval;
let isPlaying = false;
document.addEventListener('keypress', (e) => {
    if (e.key === ' ') {
        if (isPlaying) {
            clearInterval(interval);
            isPlaying = false;
        } else {
            interval = setInterval(tick, 100);
            isPlaying = true;
        }
    }
});
