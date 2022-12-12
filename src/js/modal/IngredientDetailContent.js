import ModalContent from './ModalContent';
import ingredientContent from '../../templates/cocktail-info-modal.hbs';
import Modal from './Modal';

export default class IngredientDetailContent extends ModalContent {
  constructor(data) {
    super(data);
  }

  init() {
    super.init();

    const template = document.createElement('div');
    template.innerHTML = ingredientContent(this.data).trim();

    this.contentRef.append(template.firstChild);
    this._addEventListener();
  }

  _addEventListener() {}
}
