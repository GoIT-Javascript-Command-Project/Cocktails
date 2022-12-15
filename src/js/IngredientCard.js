import createIngredientCard from '../templates/ingredient-card.hbs';
import CocktailsAPI from './services/cocktailsAPI';
import Modal from './modal/Modal';
import IngredientDetailContent from './modal/IngredientDetailContent';
import LocalStorage from './services/localStorage';
import svg from '../images/icons.svg';

export default class IngredientCard {
  #data = null;
  #contentRef = null;
  #refs = null;
  #isRemovable = false;

  constructor(data, isRemovable = false) {
    this.#data = {
      ...data,
      isFavorite: LocalStorage.hasFavoriteIngredient(data.id),
      svg: `${svg}#heart-icon`,
    };
    this.#isRemovable = isRemovable;
    this.#createMarkup(this.#data);
    this.#addListeners();
  }

  render() {
    return this.#contentRef;
  }

  #createMarkup(data) {
    const container = document.createElement('div');
    container.innerHTML = createIngredientCard(data).trim();
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

    CocktailsAPI.getIngredientInfo(this.#data.name).then(data => {
      Modal.show(
        new IngredientDetailContent(
          data,
          this.#setFavorite.bind(this)
        ).getContentRef()
      );
    });
  };

  #toggleFavorite(value) {
    const { isFavorite, svg, ...data } = this.#data;

    if (value) {
      LocalStorage.setFavoriteIngredients(data);
    } else {
      LocalStorage.removeFavoriteIngredient(data.id);
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
