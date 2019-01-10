const toggle = document.querySelector('#nav-toggle');
const navbar = document.querySelector('nav#navbar-mobile');

const like = document.querySelector('p.like');
const count = document.querySelector('span.upvote');



toggle.addEventListener('click', () => {
  setTimeout(() => {
    toggleDisplay(navbar);
  }, 200);
});

function toggleDisplay(selector) {
  if (selector.style.display !== 'block') {
    selector.style.display = 'block';
    selector.style.animation = 'slide-down .3s ease-in-out';
    return;
  }
  selector.style.display = 'none';
  selector.style.animation = 'slide-down .3s ease-in-out';
}


function transition() {
  navbar.style.transitionProperty = 'display';
  navbar.style.transitionDelay = '1s';
  navbar.style.transitionDuration = '1s';
}


function toggleComments(event) {
  let toggler = event.target;
  let parent = toggler.parentElement.parentElement.parentElement.parentElement.parentElement;
  if (parent.children[1].style.display != 'block') {
    parent.children[1].style.display = 'block';
    parent.children[2].style.display = 'block';
    return;
  }
  parent.children[1].style.display = 'none';
  parent.children[2].style.display = 'none';
}

function increaseCount(event) {
  let countHolder = event.target.parentNode.lastChild;
  let count = parseInt(countHolder.innerHTML);
   count += 1;
   countHolder.innerHTML = count;
}

function decreaseCount(event) {
  let countHolder = event.target.parentNode.lastChild;
  let count = parseInt(countHolder.innerHTML);
   count > 0 ? count -= 1 : '';
   countHolder.innerHTML = count;
}