export const themeInit = () => {
  const body = document.querySelector('body');
  const toggle = document.querySelector('.toggle');
  const dark = document.querySelector('.darky');
  const light = document.querySelector('.lighty');

  const drop = document.querySelector('.drop');

  let getMode = localStorage.getItem('mode');

  if (getMode && getMode === 'dark') {
    body.classList.add('dark');
    toggle.classList.add('active');
    dark.classList.add('act');
    drop.classList.add('drop-dark');
  }

  if (getMode && getMode === 'light') {
    body.classList.add('light');
    light.classList.add('act');
  }

  toggle.addEventListener('click', () => {
    body.classList.toggle('dark');
    if (!body.classList.contains('dark')) {
      light.classList.add('act');
      dark.classList.remove('act');
      drop.classList.remove('drop-dark');

      return localStorage.setItem('mode', 'light');
    }
    light.classList.remove('act');
    dark.classList.add('act');
    drop.classList.add('drop-dark');

    localStorage.setItem('mode', 'dark');
  });

  // Mobile switcher

  const mobDark = document.querySelector('.mobile-darky');
  const mobLight = document.querySelector('.mobile-lighty');
  const toggleMobile = document.querySelector('.mobile__toggle');
  const mobileDrop = document.querySelector('.dropdown-content');

  if (getMode && getMode === 'dark') {
    body.classList.add('dark');
    toggleMobile.classList.add('active');
    mobDark.classList.add('act');
    mobileDrop.classList.add('drop-dark');
  }

  if (getMode && getMode === 'light') {
    body.classList.add('light');
    mobLight.classList.add('act');
  }

  toggleMobile.addEventListener('click', () => {
    body.classList.toggle('dark');

    if (!body.classList.contains('dark')) {
      mobLight.classList.add('act');
      mobDark.classList.remove('act');
      mobileDrop.classList.remove('drop-dark');
      return localStorage.setItem('mode', 'light');
    }
    mobLight.classList.remove('act');
    mobDark.classList.add('act');
    mobileDrop.classList.add('drop-dark');

    localStorage.setItem('mode', 'dark');
  });

  toggleMobile.addEventListener('click', () => {
    toggleMobile.classList.toggle('active');
    toggle.classList.toggle('active');
  });

  toggle.addEventListener('click', () => {
    toggleMobile.classList.toggle('active');
    toggle.classList.toggle('active');
  });
};
