import LocalStorage from './services/localStorage';

const body = document.querySelector('body');
const toggle = document.querySelector('.toggle');
const dark = document.querySelector('.darky');
const light = document.querySelector('.lighty');
const drop = document.querySelector('.drop');

const mobDark = document.querySelector('.mobile-darky');
const mobLight = document.querySelector('.mobile-lighty');
const toggleMobile = document.querySelector('.mobile__toggle');
const mobileDrop = document.querySelector('.dropdown-content');

let theme = LocalStorage.getTheme();

function toggleTheme() {
  toggleMobile.classList.toggle('active');
  toggle.classList.toggle('active');

  // Збнригання теми в локальному сховищі
  theme = theme === 'light' ? 'dark' : 'light';
  LocalStorage.setTheme(theme);
  setTheme(theme);

  if (!body.classList.contains('dark')) {
    light.classList.add('act');
    dark.classList.remove('act');
    drop.classList.remove('drop-dark');
    mobLight.classList.add('act');
    mobDark.classList.remove('act');
    mobileDrop.classList.remove('drop-dark');
    return;
  }

  light.classList.remove('act');
  dark.classList.add('act');
  drop.classList.add('drop-dark');
  mobLight.classList.remove('act');
  mobDark.classList.add('act');
  mobileDrop.classList.add('drop-dark');
}

function setTheme(theme) {
  body.classList.remove(theme === 'light' ? 'dark' : 'light');
  body.classList.add(theme);
}

export const themeInit = () => {
  setTheme(theme);

  if (theme && theme === 'dark') {
    toggle.classList.add('active');
    dark.classList.add('act');
    drop.classList.add('drop-dark');
    toggleMobile.classList.add('active');
    mobDark.classList.add('act');
    mobileDrop.classList.add('drop-dark');
  }

  if (theme && theme === 'light') {
    light.classList.add('act');
    mobLight.classList.add('act');
  }

  toggleMobile.addEventListener('click', toggleTheme);
  toggle.addEventListener('click', toggleTheme);
};
