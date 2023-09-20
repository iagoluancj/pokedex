// const toggleMenuButton = document.getElementById('toggleMenuButton');
// const dropdownContenet = document.querySelector('.dropdownContenet');

// toggleMenuButton.addEventListener('click', function () {
//   dropdownContenet.classList.toggle('showMenu');
// });

function openMenu() {
  if (menuNav.style.display == 'flex') {
      menuNav.style.display = 'none'
  } else {
    menuNav.style.display = 'flex'
  }
}