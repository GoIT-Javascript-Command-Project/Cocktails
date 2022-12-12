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
    this.contentRef.append(template.firstChild);
    this._addEventListener();
  }

  _addEventListener() {
    const ref = this.contentRef.querySelector('.ingredients');

    ref.addEventListener('click', evt => {
      evt.preventDefault();

      const m = new ModalContent();
      Modal.show(m.getContentRef());
    });
  }
}
