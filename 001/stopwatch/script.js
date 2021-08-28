const timer = document.querySelector('.timer');
const start = document.querySelector('.start');
const stop = document.querySelector('.stop');
const reset = document.querySelector('.reset');

let interval;
let time = 0;

function timerHandler() {
    const h = Math.floor(time / 3600).toString().padStart(2, '0');
    const m = Math.floor((time % 3600) / 60).toString().padStart(2, '0');
    const s = (time % 60).toString().padStart(2, '0');

    timer.innerText = `${h}:${m}:${s}`;

    time++;
}

start.addEventListener('click', () => {
    interval = setInterval(timerHandler, 1000);
});

stop.addEventListener('click', () => {
    clearInterval(interval);
});

reset.addEventListener('click', () => {
    timer.innerText = '00:00:00';
    time = 0;
});