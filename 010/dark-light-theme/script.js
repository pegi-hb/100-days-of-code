document.querySelector('header .auth .switch-wrapper .chk').addEventListener('change', (e) => {
    if (e.target.checked) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
});