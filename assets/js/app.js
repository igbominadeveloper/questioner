let toggle = document.querySelector('#nav-toggle');

let navbar = document.querySelector('nav#navbar-mobile');

toggle.addEventListener('click', () =>{
    toggleDisplay();   
});

function toggleDisplay() {
    if (navbar.style.display !== 'block') {
        return navbar.style.display = 'block';
    }
    return navbar.style.display = 'none';
}

