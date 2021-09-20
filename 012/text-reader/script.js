const box = document.querySelector('.box');
const read = document.querySelector('.read');

read.addEventListener('click', () => {
    let ut = new SpeechSynthesisUtterance(box.value);
    speechSynthesis.speak(ut);
});