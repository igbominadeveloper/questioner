const toggle = document.querySelector('#nav-toggle');

const navbar = document.querySelector('nav#navbar-mobile');

toggle.addEventListener('click', () => {
  setTimeout(() => {
    toggleDisplay();
  }, 200);
});

function toggleDisplay() {
  if (navbar.style.display !== 'block') {
    navbar.style.display = 'block';
    navbar.style.animation = 'slide-down .3s ease-in-out';
    return;
  }
  navbar.style.display = 'none';
  navbar.style.animation = 'slide-down .3s ease-in-out';
}

function transition() {
  navbar.style.transitionProperty = 'display';
  navbar.style.transitionDelay = '1s';
  navbar.style.transitionDuration = '1s';
}
