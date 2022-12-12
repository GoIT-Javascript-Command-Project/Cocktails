import ModalContent from './ModalContent';
import cocktailContent from '../../templates/cocktail-info-modal.hbs';
import Modal from './Modal';

export default class CocktailDetailsContent extends ModalContent {
  constructor(data) {
    super(data);
  }

  init() {
    super.init();

    const template = document.createElement('div');
    template.innerHTML = cocktailContent(this.data);

    console.log(template.firstChild);
    this.contentRef.append(template);
    this._addEventListener();
  }

  _addEventListener() {
    console.log(this.contentRef);
    const ref = this.contentRef.querySelector(
      '.cocktail-details-block__ingredient-list'
    );

    ref.addEventListener('click', evt => {
      evt.preventDefault();

      const m = new ModalContent();
      Modal.show(m.getContentRef());
    });
  }
}
