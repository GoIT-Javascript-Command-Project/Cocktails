import cocktailsAPI from './js/services/cocktailsAPI';
import makeCocktailCard from './templates/ingredient-card.hbs';

const modal = document.querySelector('.card-container');
const cocktailServise = new cocktailsAPI();

async function findIng(ingredient) {
  const cocktails = await cocktailServise.getIngredientInfo(ingredient);
  const cocktailCard = makeCocktailCard(cocktails);
  modal.innerHTML = cocktailCard;
}

findIng('Campari');
