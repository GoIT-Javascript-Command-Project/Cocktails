import Modal from './Modal';
import modalContent from '../../templates/modalContent.hbs';
import svg from '../../images/icons.svg';

export default class ModalContent {
  #refs = {};
  contentRef = null;

  constructor(data) {
    this.data = data;
    this.init();
  }

  init() {
    const content = document.createElement('div');

    content.innerHTML = modalContent({
      closeIcon: `${svg}#close-icon`,
    });
    this.contentRef = content.firstChild;

    this.#addListeners();
  }

  destroy() {
    this.#removeListeners();
  }

  getContentRef() {
    return this.contentRef;
  }

  #closeHandler = () => {
    Modal.close();
  };

  #addListeners() {
    const btn = this.contentRef.querySelector('.modal__close-btn');
    btn.addEventListener('click', this.#closeHandler);
  }

  #removeListeners() {
    const btn = this.contentRef.querySelector('.modal__close-btn');
    btn.removeEventListener('click', this.#closeHandler);
  }
}
