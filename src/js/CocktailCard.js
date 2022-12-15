import createCocktailCard from '../templates/cocktail-card.hbs';
import CocktailsAPI from './services/cocktailsAPI';
import Modal from './modal/Modal';
import CocktailDetailsContent from './modal/CocktailDetailsContent';
import LocalStorage from './services/localStorage';
import svg from '../images/icons.svg';

export default class CocktailCard {
  #data = null;
  #contentRef = null;
  #refs = null;
  #isRemovable = false;

  constructor(data, isRemovable = false, callback = null) {
    this.#data = {
      ...data,
      isFavorite: LocalStorage.hasFavoriteCocktail(data.id),
      svg: `${svg}#heart-icon`,
    };
    this.#isRemovable = isRemovable;
    this.callback = callback;
    this.#createMarkup(this.#data);
    this.#addListeners();
  }

  render() {
    return this.#contentRef;
  }

  #createMarkup(data) {
    const container = document.createElement('div');
    container.innerHTML = createCocktailCard(data).trim();
    this.#contentRef = container.firstChild;

    this.#refs = {
      learnMoreBtn: this.#contentRef.querySelector('[data-info]'),
      favoriteBtn: this.#contentRef.querySelector('[data-add]'),
      favoriteText: this.#contentRef.querySelector('[data-add] span'),
    };
  }

  #destroy() {}

  #clickMoreHandler = evt => {
    evt.currentTarget.blur();

    CocktailsAPI.getCocktailInfoById(this.#data.id).then(data => {
      Modal.show(
        new CocktailDetailsContent(
          data,
          this.#setFavorite.bind(this)
        ).getContentRef()
      );
    });
  };

  #toggleFavorite(value) {
    const { isFavorite, svg, ...data } = this.#data;

    if (value) {
      LocalStorage.setFavoriteCocktails(data);
    } else {
      LocalStorage.removeFavoriteCocktail(data.id);
    }

    this.#setFavorite(value);
  }

  #setFavorite(value) {
    const { favoriteText, favoriteBtn } = this.#refs;

    if (value) {
      favoriteText.textContent = 'Remove';
    } else {
      favoriteText.textContent = 'Add to';
      this.#isRemovable && this.#contentRef.remove();
    }

    favoriteBtn.dataset.favorite = value;
    this.#data.isFavorite = value;

    // Виклик функціі оновлення
    if (this.callback) this.callback();
  }

  #addListeners() {
    const { learnMoreBtn, favoriteBtn } = this.#refs;

    learnMoreBtn.addEventListener('click', this.#clickMoreHandler);

    favoriteBtn.addEventListener('click', evt => {
      evt.currentTarget.blur();

      const { isFavorite } = this.#data;

      this.#toggleFavorite(!isFavorite);
    });
  }
}
