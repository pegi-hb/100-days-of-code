const rgb = document.querySelector('.rgb');
const color = document.querySelector('.color');
const hex = document.querySelector('.hex');
const red = document.querySelector('.rngRed');
const green = document.querySelector('.rngGreen');
const blue = document.querySelector('.rngBlue');

function updateColor() {
    color.style.backgroundColor = `rgb(${red.value},${green.value},${blue.value})`;
    rgb.innerText = `rgb(${red.value},${green.value},${blue.value})`;
    hex.innerText = `#${parseInt(red.value, 10).toString(16).padStart(2, '0')}${parseInt(green.value, 10).toString(16).padStart(2, '0')}${parseInt(blue.value, 10).toString(16).padStart(2, '0')}`.toUpperCase();

    red.style.background = `linear-gradient(to right, rgb(0,${green.value},${blue.value}), rgb(255,${green.value},${blue.value}))`;
    green.style.background = `linear-gradient(to right, rgb(${red.value},0,${blue.value}), rgb(${red.value},255,${blue.value}))`;
    blue.style.background = `linear-gradient(to right, rgb(${red.value},${green.value},0), rgb(${red.value},${green.value},255))`;
}
updateColor();

red.addEventListener('input', updateColor);
green.addEventListener('input', updateColor);
blue.addEventListener('input', updateColor);