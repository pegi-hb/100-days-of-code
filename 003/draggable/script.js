const win = document.querySelector('.window');

let isDragging = false;
let startMousePos = { x: 0, y: 0 };
let startWindowPos = { x: 0, y: 0 };

win.querySelector('header').addEventListener('mousedown', (e) => {
    startMousePos.x = e.clientX || e.pageX;
    startMousePos.y = e.clientY || e.pageY;

    startWindowPos.x = win.offsetLeft;
    startWindowPos.y = win.offsetTop;

    isDragging = true;
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        const x = e.clientX || e.pageX;
        const y = e.clientY || e.pageY;

        const dx = x - startMousePos.x;
        const dy = y - startMousePos.y;

        win.style.left = `${startWindowPos.x + dx}px`;
        win.style.top = `${startWindowPos.y + dy}px`;
    }
});

document.addEventListener('mouseup', () => {
    isDragging = false;
});