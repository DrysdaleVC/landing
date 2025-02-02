document.addEventListener("DOMContentLoaded", function() {
    const toggleSwitch = document.getElementById('modeToggle');
    const body = document.body;
    const logo = document.getElementById('logo');

    toggleSwitch.addEventListener('change', () => {
        body.classList.toggle('light-mode');
        logo.src = body.classList.contains('light-mode') ? 'LogotypeBlack.png' : 'LogotypeWhite.png';
    });
});
