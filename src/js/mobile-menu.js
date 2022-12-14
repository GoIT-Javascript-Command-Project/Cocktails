export const mobileMenuInit = () => {
  const refs = {
    openMenuBtn: document.querySelector('[data-menu-open]'),
    closeMenuBtn: document.querySelector('[data-menu-close]'),
    menu: document.querySelector('[data-menu]'),
  };

  function hideMenu() {
    refs.menu.classList.add('is-hidden');
    document.body.classList.remove('scroll-lock');
  }

  function toggleMenu() {
    document.body.classList.toggle('scroll-lock');
    refs.menu.classList.toggle('is-hidden');
  }
  refs.openMenuBtn.addEventListener('click', toggleMenu);
  refs.closeMenuBtn.addEventListener('click', toggleMenu);

  const smoothLinks = document.querySelectorAll('a[href^="#"]');
  for (let smoothLink of smoothLinks) {
    smoothLink.addEventListener('click', function () {
      hideMenu();
    });
  }

  window.matchMedia('(min-width: 1280px)').addEventListener('change', e => {
    if (!e.matches) return;
    hideMenu();
  });
};
