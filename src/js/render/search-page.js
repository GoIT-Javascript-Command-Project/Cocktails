import Pagination from '../pagination/pagination';
import CocktailsAPI from '../services/cocktailsAPI';

const form = document.querySelector('form');

export default class RenderSearchPage {
  constructor() {
    this.searchWord = '';
    this.data;
  }
  render() {
    this.getWord();
  }
  getWord() {
    form.addEventListener('submit', async event => {
      event.preventDefault();
      this.searchWord = event.currentTarget.elements.cocktail.value;
      this.data = await CocktailsAPI.getCocktailsByName(this.searchWord);
      this.createPagination();
    });
  }
  createPagination() {
    const pagination = new Pagination(this.data, 3);
    pagination.init();
  }
}
