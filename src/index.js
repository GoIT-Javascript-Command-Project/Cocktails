import cocktailsAPI from './js/services/cocktailsAPI';
import makeCocktailCard from '../src/templates/cocktail-card.hbs';

const cocktailServise = new cocktailsAPI();
const cocktailCardsContainerRef = document.querySelector('.card-container');

showRandomCocktails(9);

async function showRandomCocktails(amount) {
  let arrayOfCocktails = await getRandomCocktails(amount);
  let cocktailCardMurkup = makeСocktailCardMurkup(arrayOfCocktails);
  insertMurkupIntoPage(cocktailCardMurkup);
}

async function getRandomCocktails(amount) {
  let arrayOfCocktails = [];
  for (let i = 1; i <= amount; i += 1) {
    const randomCocktail = cocktailServise.getOneRandomCocktail();
    arrayOfCocktails = [...arrayOfCocktails, randomCocktail];
  }
  arrayOfCocktails = await Promise.all(arrayOfCocktails);
  return arrayOfCocktails;
}

function makeСocktailCardMurkup(arrayOfCocktails) {
  return arrayOfCocktails.map(makeCocktailCard).join('');
}

function insertMurkupIntoPage(cocktailCardMurkup) {
  cocktailCardsContainerRef.innerHTML = cocktailCardMurkup;
}

// async function getRandomCocktails(amount) {
//   let arrayOfCocktails = [];
//   for (let i = 1; i <= amount; i += 1) {
//     const randomCocktail = cocktailServise.getOneRandomCocktail();
//     arrayOfCocktails = [...arrayOfCocktails, randomCocktail];
//   }

//   arrayOfCocktails = await Promise.all(arrayOfCocktails);
//   const cocktailCardMurkup = arrayOfCocktails.map(makeCocktailCard).join('');
//   cocktailCardsContainerRef.innerHTML = cocktailCardMurkup;
// }

// getRandomCocktails(2);
import CocktailDetailsContent from './js/modal/CocktailDetailsContent';
import CocktailAPI from './js/services/cocktailsAPI';
import Modal from './js/modal/Modal';

document.querySelector('.test').addEventListener('click', () => {
  const f = new CocktailAPI();

  f.getOneRandomCocktail().then(data => {
    console.log(data);
    const m1 = new CocktailDetailsContent(data);

    Modal.show(m1.getContentRef());
  });
});
