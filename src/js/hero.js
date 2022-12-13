
import { getCocktailsByFirstLetter } from './services/cocktailAPI';




const {
  heroButtonRef,
  heroSelectRef,
  letterList,
} = {
  heroButtonRef: document.querySelector('.hero__list'),
  heroSelectRef: document.querySelector('[name="search"]'),
  letterList: document.querySelector('.hero__list'),

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
heroSelectRef.addEventListener('change', e => letterListMob(e));


function onLoadingHero() {
  createSearchButtons(buttons);
  createSearchButtonsMobile(buttons);

}

function createSearchButtons(buttons) {
  const markup = buttons
    .map(button => {
      return `<button type = "button" class="hero__button">${button}</button>`;
    })
    .join('');
  heroButtonRef.innerHTML = markup;
}

function createSearchButtonsMobile(buttons) {
  const markup = buttons
    .map(button => {
      return `<option value="${button}">${button}</option>`;
    })
    .join('');
  heroSelectRef.innerHTML = markup;
}

async function letterListMob(e) {
  if (e.target.nodeName === 'SELECT') {
    try {
      const letter = e.target.value;
      console.log(letter);
      const response = await getCocktailsByFirstLetter(letter);
    } catch (error) {
    }
  }
}

async function onClickSearchLetter(e) {
  if (e.target.nodeName === 'BUTTON') {
    try {
      const letter = e.target.textContent;
      console.log(letter)
      const response = await getCocktailsByFirstLetter(letter);
      console.dir(response);
    } catch (error) {
    }
  }
}

