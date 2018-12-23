let toggle = document.querySelector('#nav-toggle');

let navbar = document.querySelector('nav#navbar-mobile');

toggle.addEventListener('click', () =>{
    setTimeout(() => {
        toggleDisplay();   
    }, 200);
});

function toggleDisplay() {
    if (navbar.style.display !== 'block') {
        navbar.style.display = 'block';
        return;
    }
    navbar.style.display = 'none';
    return;

}

function transition() {
    navbar.style.transitionProperty = 'display';
    navbar.style.transitionDelay = '1s';
    navbar.style.transitionDuration = '1s';
}

