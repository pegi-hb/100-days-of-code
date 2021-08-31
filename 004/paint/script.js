const canvas = document.querySelector('.canvas');
const cursor = document.querySelector('.cursor');
const sizeInput = document.querySelector('.size')
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 27;

ctx.lineJoin = 'round';
setSize(10, true);

let isDrawing = false;
let lx = 0;
let ly = 0;

function setSize(s, updateInput = false) {
    s = Math.max(1, Math.min(s, 100));

    ctx.lineWidth = s;

    cursor.style.width = `${s}px`;
    cursor.style.height = `${s}px`;

    if (updateInput) {
        sizeInput.value = s;
    }
}

canvas.addEventListener('mousedown', (e) => {
    const x = e.clientX || e.pageX;
    const y = e.clientY || e.pageY;

    lx = x;
    ly = y;

    isDrawing = true;
});

document.addEventListener('mousemove', (e) => {
    const x = e.clientX || e.pageX;
    const y = e.clientY || e.pageY;

    if (isDrawing) {

        ctx.beginPath();
        ctx.moveTo(lx - canvas.offsetLeft, ly - canvas.offsetTop);
        ctx.lineTo(x - canvas.offsetLeft, y - canvas.offsetTop);
        ctx.closePath();
        ctx.stroke();

        lx = x;
        ly = y;
    }

    cursor.style.left = `${x}px`;
    cursor.style.top = `${y}px`;
});

document.addEventListener('mouseup', () => {
    isDrawing = false;
});


document.querySelector('.color').addEventListener('input', (e) => {
    ctx.strokeStyle = e.target.value;
});
sizeInput.addEventListener('input', (e) => {
    setSize(e.target.value);
});

document.addEventListener('keypress', (e) => {
    const lw = ctx.lineWidth;

    if (e.key === '[') {
        if (lw > 1) {
            setSize(lw - 5, true);
        }
    } else if (e.key === ']') {
        if (lw < 100) {
            setSize(lw + 5, true);
        }
    }
});

document.querySelector('.reset').addEventListener('click', () => {
    ctx.clearRect(0,0, canvas.width, canvas.height);
});