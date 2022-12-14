// import { getCocktailsByFirstLetter } from './services/cocktailAPI';

const { heroButtonRef, letterList, inputMobile, inputSpan, selectLetter } = {
  heroButtonRef: document.querySelector('.hero__list'),
  letterList: document.querySelector('.hero__list'),

  inputMobile: document.querySelector('.select__input'),
  inputSpan: document.querySelector('.input-span'),
  selectLetter: document.querySelector('#select'),
};

const buttons = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '0',
];

inputMobile.addEventListener('click', onMobLetterClick);

//

let checked = document.querySelector('.select__input');
let mobOpen = document.querySelector('.gallery__title');

// Функция создания кнопок поиска для десктоп и таблет
export function heroInit() {
  createSearchButtons(buttons);
}

// Функция создания (разметка) кнопок поиска для десктоп и таблет
function createSearchButtons(buttons) {
  const markup = buttons
    .map(button => {
      return `<button type = "button" class="hero__button">${button}</button>`;
    })
    .join('');
  heroButtonRef.innerHTML = markup;
}

// Функция создания (разметка) списка поиска для мобилки
function createDroplist() {
  const markup = `<div class="select__dropdown">
      <ul class="select__list">
      ${createButtonsMarkup()}
      </ul>
      </div>`;
  selectLetter.insertAdjacentHTML('beforeend', markup);
}

function createButtonsMarkup() {
  return buttons
    .map(btn => {
      return `
      <li class="select__item" data-letter="${btn}">${btn.toUpperCase()}</li>
      `;
    })
    .join('');
}

let isOpen = false;
// Функция создания вслывающего списка
function onMobLetterClick(evt) {
  mobOpen.classList.add('mob-open');
  if (selectLetter.children.length > 1) {
    mobOpen.classList.remove('mob-open');
    selectLetter.lastChild.remove();
    return;
  }

  createDroplist();
  selectLetter.lastChild.addEventListener('click', e => {
    checked.classList.add('select__input-checked');
    inputSpan.textContent = e.target.dataset.letter.toUpperCase();
    closeDropdownMenu();
  });

  evt.stopPropagation();
  if (!isOpen) {
    isOpen = true;
    document.body.addEventListener('click', closeDropdownMenu, { once: true });
  }
}

function closeDropdownMenu() {
  isOpen = false;
  const el = document.querySelector('.select__dropdown');
  el?.remove();
  mobOpen.classList.remove('mob-open');
  document.body.removeEventListener('click', closeDropdownMenu, { once: true });
}
