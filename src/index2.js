import cocktailsAPI from './js/services/cocktailsAPI';
import makeCocktailCard from '../src/templates/cocktail-info-modal.hbs';
const modal = document.querySelector('.modal-container');
const cocktailServise = new cocktailsAPI();

// async function findCocktail() {
//   const cocktails = await cocktailServise.getCocktailsByName('Negroni');
//   const cocktail = cocktails[0];
//   const cocktailCard = makeCocktailCard(cocktail);
//   modal.innerHTML = cocktailCard;
// }
async function findCocktail() {
  const cocktails = await cocktailServise.getOneRandomCocktail();
  //   const cocktail = cocktails[0];
  const cocktailCard = makeCocktailCard(cocktails);
  modal.innerHTML = cocktailCard;
}

findCocktail();
// const cocktailCardsContainerRef = document.querySelector('.card-container');

// showRandomCocktails(9);

// async function showRandomCocktails(amount) {
//   let arrayOfCocktails = await getRandomCocktails(amount);
//   let cocktailCardMurkup = makeСocktailCardMurkup(arrayOfCocktails);
//   insertMurkupIntoPage(cocktailCardMurkup);
// }

// async function getRandomCocktails(amount) {
//   let arrayOfCocktails = [];
//   for (let i = 1; i <= amount; i += 1) {
//     const randomCocktail = cocktailServise.getOneRandomCocktail();
//     arrayOfCocktails = [...arrayOfCocktails, randomCocktail];
//   }
//   arrayOfCocktails = await Promise.all(arrayOfCocktails);
//   return arrayOfCocktails;
// }

// function makeСocktailCardMurkup(arrayOfCocktails) {
//   return arrayOfCocktails.map(makeCocktailCard).join('');
// }

// function insertMurkupIntoPage(cocktailCardMurkup) {
//   cocktailCardsContainerRef.innerHTML = cocktailCardMurkup;
// }

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
