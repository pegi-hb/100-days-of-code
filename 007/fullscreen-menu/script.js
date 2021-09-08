const menu = document.querySelector('.menu');
const menubar = document.querySelector('.menubar');
const header = document.querySelector('header');

menubar.addEventListener('click', () => {
    menu.classList.toggle('open');
    header.classList.toggle('menu-open');
});