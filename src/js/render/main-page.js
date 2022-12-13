import makeCocktailCard from '../../templates/cocktail-card.hbs';
import LocalStorage from '../../js/services/localStorage';
import CocktailsAPI from '../services/cocktailsAPI';
import Modal from '../modal/Modal';
import CocktailDetailsContent from '../modal/CocktailDetailsContent';
const cardList = document.querySelector('.pagination__cards');
// Modal.show(new CocktailDetailsContent({ obj }).getContentRef());

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
    cardList.innerHTML = this.data.map(makeCocktailCard).join('');
    this.#loadMoreButtonHandler();
    this.#addToButtonHandler();
  }

  #loadMoreButtonHandler() {
    cardList.addEventListener('click', async event => {
      if (event.target.classList.contains('button--primary')) {
        const info = await CocktailsAPI.getCocktailInfoById(
          event.target.dataset.id
        );
        Modal.show(new CocktailDetailsContent(info).getContentRef());
      }
    });
  }
  #addToButtonHandler() {
    cardList.addEventListener('click', event => {
      if (event.target.classList.contains('button--secondary')) {
        if (event.target.textContent.includes('Add to')) {
          const cocktail = this.data.find(
            el => el.id === event.target.dataset.id
          );
          LocalStorage.setFavoriteCocktails(cocktail);
          event.target.textContent = 'Remove';
        } else if (event.target.textContent.includes('Remove')) {
          LocalStorage.removeFavoriteCocktail(event.target.dataset.id);
          event.target.textContent = 'Add to';
        }
      }
    });
  }
}

export default RenderMainPage;
