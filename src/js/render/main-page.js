// import CocktailsAPI from '../services/cocktailsAPI';
import CocktailCard from './../CocktailCard';
import mainPage from '../../templates/main-page.hbs';
const cardList = document.querySelector('.pagination__cards');

export default class RenderMainPage {
  constructor(data) {
    this.data = data;
  }
  render(data) {
    const section = document.createElement('section');
    const template = mainPage();
    section.innerHTML = template;
    cardList.append(
      ...this.data.map(item => {
        return new CocktailCard(item).render();
      })
    );
    return section;
  }
}

// class RenderMainPage {
//   constructor() {
//     this.data;
//   }

//   async render() {
//     this.data = await CocktailsAPI.getRandomCocktails(9);
//     if (
//       window.matchMedia('(min-width: 768px) and (max-width: 1279.98px)').matches
//     ) {
//       this.data.length = 6;
//     } else if (window.matchMedia('(max-width: 767.98px)').matches) {
//       this.data.length = 3;
//     }
//     cardList.innerHTML = '';
//     cardList.append(
//       ...this.data.map(item => {
//         return new CocktailCard(item).render();
//       })
//     );
//   }
// }
