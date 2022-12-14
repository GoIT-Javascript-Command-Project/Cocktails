import Pagination from '../pagination/pagination';
import searchPage from '../../templates/search-page.hbs';

export default class RenderSearchPage {
  constructor(data) {
    this.data = data;
  }
  render(data) {
    const section = document.createElement('section');
    const markUp = searchPage();
    section.innerHTML = markUp;
    const pagination = new Pagination(this.data, 9);
    pagination.init();
    return section;
  }
}

// import CocktailsAPI from '../services/cocktailsAPI';

// const form = document.querySelector('form');

// export default class RenderSearchPage {
//   constructor() {
//     this.searchWord = '';
//     this.data;
//   }
//   render() {
//     this.getWord();
//   }
//   getWord() {
//     form.addEventListener('submit', async event => {
//       event.preventDefault();
//       this.searchWord = event.currentTarget.elements.cocktail.value;
//       this.data = await CocktailsAPI.getCocktailsByName(this.searchWord);
//       this.createPagination();
//     });
//   }
//   createPagination() {
//     const pagination = new Pagination(this.data, 3);
//     pagination.init();
//   }
// }
