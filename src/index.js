import makeCocktailCard from './templates/cocktail-card.hbs';
import CocktailsAPI from './js/services/cocktailsAPI';
const cardList = document.querySelector('ul');
console.log(cardList);
async function render() {
  const result = await CocktailsAPI.getRandomCocktails(9);
  //   console.log(result);
  console.log(makeCocktailCard());
  console.log(result.map(makeCocktailCard).join(''));
  const retr = result.map(makeCocktailCard).join('');
  cardList.innerHTML = retr;
}
render();
