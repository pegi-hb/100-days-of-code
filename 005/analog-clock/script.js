const clock = document.querySelector('.clock');

function createElements(htmlCode) {
    let div = document.createElement('div');
    div.innerHTML = htmlCode;
    return div.firstChild;
}

function initDots() {
    const dots = createElements('<div class="dots"></div>');

    for (let i = 0; i < 60; i++) {
        const angle = i * 6
        const sin = Math.sin(angle * Math.PI / 180);
        const cos = Math.cos(angle * Math.PI / 180);

        const dot = createElements('<div class="dot"></div>');

        dot.style.left = `${250 + cos * 230}px`;
        dot.style.top = `${250 + sin * 230}px`;

        if (i % 5 === 0) {
            dot.classList.add('big');
        }

        dots.appendChild(dot);
    }

    clock.appendChild(dots);
}

function initNumbers() {
    const nums = createElements('<div class="nums"></div>');

    for (let i = 1; i <= 12; i++) {
        const angle = i * 30 - 90;
        const sin = Math.sin(angle * Math.PI / 180);
        const cos = Math.cos(angle * Math.PI / 180);

        const num = createElements(`<div class="num">${i}</div>`);

        if (i % 3 === 0) {
            num.classList.add('big');
        }

        num.style.left = `${250 + cos * 200}px`;
        num.style.top = `${250 + sin * 200}px`;

        nums.appendChild(num);
    }

    clock.appendChild(nums);
}

function initHands() {
    const hands = createElements('<div class="hands"></div>');

    const pivot = createElements('<div class="pivot"></div>');

    const hourHand = createElements('<div class="hour hand"></div>');
    const minuteHand = createElements('<div class="minute hand"></div>');
    const secondHand = createElements('<div class="second hand"></div>');

    hands.appendChild(secondHand);
    hands.appendChild(minuteHand);
    hands.appendChild(hourHand);
    hands.appendChild(pivot);

    clock.appendChild(hands);
}

function showTime() {
    const d = new Date();
    const h = d.getHours();
    const m = d.getMinutes();
    const s = d.getSeconds();
    const ms = d.getMilliseconds();

    const ha = (h + (m * 60 + s) / 3600) * 30;
    const ma = (m + s / 60) * 6;
    const sa = (s + ms / 1000) * 6;

    document.documentElement.style.setProperty('--hour-hand-rotation', `${ha}deg`);
    document.documentElement.style.setProperty('--minute-hand-rotation', `${ma}deg`);
    document.documentElement.style.setProperty('--second-hand-rotation', `${sa}deg`);
}

initDots();
initNumbers();
initHands();
showTime();

setInterval(showTime, 50);