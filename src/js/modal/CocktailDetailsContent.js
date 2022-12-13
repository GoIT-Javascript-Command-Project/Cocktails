import ModalContent from './ModalContent';
import cocktailContent from '../../templates/cocktail-info-modal.hbs';
import Modal from './Modal';
import CocktailsAPI from '../services/cocktailsAPI';
import IngredientDetailContent from './IngredientDetailContent';
import LocalStorage from '../services/localStorage';

export default class CocktailDetailsContent extends ModalContent {
  constructor(data, cb = null) {
    super(
      { ...data, isFavorite: LocalStorage.hasFavoriteCocktail(data.id) },
      cb
    );
  }

  init() {
    super.init();

    this._addContent();
    this._addEventListener();
  }

  /**
   * Додає контент до модального вікна.
   */
  _addContent() {
    const template = document.createElement('div');

    template.innerHTML = cocktailContent(this.data).trim();
    this.contentRef.append(template.firstChild);
  }

  /**
   * Відкриває нове вікно з детальною інформацією про інгредіент.
   */
  _openIngredientHandler(evt) {
    const name = evt.target.dataset.name.trim();

    CocktailsAPI.getIngredientInfo(name).then(data => {
      Modal.show(new IngredientDetailContent(data).getContentRef());
    });
  }

  /**
   * Додавання/видалення коктеля з фаворитів.
   */
  _favoriteClickHandler(evt) {
    evt.target.blur();
    const { isFavorite, ...data } = this.data;

    if (isFavorite) {
      LocalStorage.removeFavoriteCocktail(data.id);
      evt.target.textContent = 'Add to favorite';
    } else {
      LocalStorage.setFavoriteCocktails(data);
      evt.target.textContent = 'Remote from favorite';
    }
    this.data.isFavorite = !isFavorite;
    this.callback(this.data.isFavorite);
  }

  /**
   * Додає прослуховувачі подій.
   */
  _addEventListener() {
    const { contentRef } = this;
    const refs = {
      ingredientsRef: contentRef.querySelector('.details__ingredient-list'),
      favoriteBtn: contentRef.querySelector('.button'),
    };

    refs.ingredientsRef.addEventListener('click', this._openIngredientHandler);
    refs.favoriteBtn.addEventListener(
      'click',
      this._favoriteClickHandler.bind(this)
    );
  }
}
