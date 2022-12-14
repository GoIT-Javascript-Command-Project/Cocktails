import CocktailsAPI from '../services/cocktailsAPI';

import CocktailCard from './../CocktailCard';
const cardList = document.querySelector('.pagination__cards');

class RenderMainPage {
  constructor() {
    this.data;
  }

  async render() {
    this.data = await CocktailsAPI.getRandomCocktails(9);
    if (
      window.matchMedia('(min-width: 768px) and (max-width: 1279.98px)').matches
    ) {
      this.data.length = 6;
    } else if (window.matchMedia('(max-width: 767.98px)').matches) {
      this.data.length = 3;
    }
    cardList.innerHTML = '';
    cardList.append(
      ...this.data.map(item => {
        return new CocktailCard(item).render();
      })
    );
  }
}

export default RenderMainPage;
