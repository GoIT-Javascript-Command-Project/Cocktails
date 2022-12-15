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

onLoadingHero();
letterList.addEventListener('click', e => onClickSearchLetter(e));
inputMobile.addEventListener('click', onMobLetterClick);

//

let checked = document.querySelector('.select__input');
let mobOpen = document.querySelector('.gallery__title');

// Функция создания кнопок поиска для десктоп и таблет
function onLoadingHero() {
  createSearchButtons(buttons);
}

async function onClickSearchLetter(e) {
  if (e.target.nodeName === 'BUTTON') {
    try {
      const letter = e.target.textContent;
      console.log(letter);
      const response = await getCocktailsByFirstLetter(letter);
    } catch (error) {}
  }
}

async function onLetterClick(e) {
  checked.classList.add('select__input-checked');
  if (!e.target.dataset.letter) return;
  try {
    const letter = e.target.textContent;
    console.log(letter);
    const response = await getCocktailsByFirstLetter(letter);
  } catch (error) {}
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
// Функция создания вслывающего списка
function onMobLetterClick() {
  mobOpen.classList.add('mob-open');
  if (selectLetter.children.length > 1) {
    mobOpen.classList.remove('mob-open');
    selectLetter.lastChild.remove();
    return;
  }

  createDroplist();
  selectLetter.lastChild.addEventListener('click', e => {
    onLetterClick(e);
    inputSpan.textContent = e.target.dataset.letter.toUpperCase();
    selectLetter.lastChild.remove();
    mobOpen.classList.remove('mob-open');
  });
}
