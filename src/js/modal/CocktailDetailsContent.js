import ModalContent from './ModalContent';
import cocktailContent from '../../templates/cocktail-info-modal.hbs';
import Modal from './Modal';
import CocktailsAPI from '../services/cocktailsAPI';
import IngredientDetailContent from './IngredientDetailContent';

export default class CocktailDetailsContent extends ModalContent {
  constructor(data) {
    super({ ...data });
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

  _openIngredientHandler(evt) {
    const name = evt.target.textContent;
    const cocktail = new CocktailsAPI();

    cocktail.getIngredientInfo(name).then(data => {
      Modal.show(new IngredientDetailContent(data).getContentRef());
    });
  }

  /**
   * Додає прослуховувачі подій.
   */
  _addEventListener() {
    const ingredientsRef = this.contentRef.querySelector(
      '.cocktail-details-block__ingredient-list'
    );
    const favoriteBtn = this.contentRef.querySelector('.button');

    ingredientsRef.addEventListener('click', this._openIngredientHandler);

    favoriteBtn.addEventListener('click', evt => {
      console.log(evt.target);
    });
  }
}
