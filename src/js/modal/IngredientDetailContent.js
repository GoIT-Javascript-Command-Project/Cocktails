import ModalContent from './ModalContent';
import ingredientContent from '../../templates/ingredient-info-modal.hbs';
import LocalStorage from '../services/localStorage';

export default class IngredientDetailContent extends ModalContent {
  constructor(data, cb = null) {
    super(
      {
        ...data,
        isFavorite: LocalStorage.hasFavoriteIngredient(data.id),
        description:
          data.description &&
          data.description.replace(/^([\w\-]+)/, `<span>$1</span>`),
      },
      cb
    );
  }

  init() {
    super.init();

    const template = document.createElement('div');
    template.innerHTML = ingredientContent(this.data).trim();

    this.contentRef.append(template.firstChild);
    this._addEventListener();
  }

  /**
   * Додавання/видалення коктеля з фаворитів.
   */
  _favoriteClickHandler(evt) {
    evt.target.blur();
    const { isFavorite, ...data } = this.data;

    if (isFavorite) {
      LocalStorage.removeFavoriteIngredient(data.id);
      evt.target.textContent = 'Add to favorite';
    } else {
      LocalStorage.setFavoriteIngredients(data);
      evt.target.textContent = 'Remote from favorite';
    }
    this.data.isFavorite = !isFavorite;
    this.callback(this.data.isFavorite);
  }

  _addEventListener() {
    const { contentRef } = this;
    const refs = {
      favoriteBtn: contentRef.querySelector('.button'),
    };

    refs.favoriteBtn.addEventListener(
      'click',
      this._favoriteClickHandler.bind(this)
    );
  }
}
