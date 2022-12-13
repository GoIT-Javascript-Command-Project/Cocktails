import Pagination from '../pagination/pagination';
import CocktailsAPI from '../services/cocktailsAPI';
import makeCocktailCard from '../../templates/cocktail-card.hbs';

const form = document.querySelector('form');
export default function getWord() {
  form.addEventListener('submit', async event => {
    event.preventDefault();
    const cocktails = await CocktailsAPI.getCocktailsByName(
      event.currentTarget.elements.cocktail.value
    );
    const pagination = new Pagination(cocktails, 3, makeCocktailCard);
    pagination.init();
  });
}
