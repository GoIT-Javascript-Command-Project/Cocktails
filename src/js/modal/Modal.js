class Modal {
  #modals = [];
  #ref = null;
  #delay = 0;

  constructor() {
    if (this._instance) {
      throw new Error("New instance can't be created!");
    }

    this.#delay = parseInt(
      getComputedStyle(document.querySelector(':root')).getPropertyValue(
        '--animation-duration'
      )
    );
    this.#ref = document.querySelector('.modal');
  }

  static getInstance() {
    if (!this._instance) {
      this._instance = new Modal();
    }

    return this._instance;
  }

  /**
   * Відкриває нове вікно.
   *
   * @param {HTMLElement} contentRef - посилання на HTML element.
   */
  show(contentRef) {
    const modal = this.#ref;

    // Прибираємо display: none з модального вікна
    if (modal.classList.contains('modal--none')) {
      modal.classList.remove('modal--none');
    }
    // Відображаемо модальне вікно та додаємо прослуховувачі закриття вікна
    if (modal.classList.contains('modal--hidden')) {
      modal.classList.remove('modal--hidden');
      this.#addListeners();
    }
    // Перевірка на наявність вже відкритого вікна. Якщо вікно вже відкрито, то переводимо вікно у стан wait і додаємо нове вікно.
    if (this.#modals.length) {
      this.#modals.at(-1).classList.remove('modal__content--show');
      this.#modals.at(-1).classList.add('modal__content--waiting');
    }
    // Додаємо контент до модального вікна
    this.#addContent(contentRef);
  }

  /**
   * Закриває останнє відкрите вікно.
   */
  close() {
    const content = this.#modals.pop();

    // Закриття останньго відкритого вікна.
    content.classList.remove('modal__content--show');
    setTimeout(() => {
      content.remove();
    }, this.#delay);

    // Повернення попередньго вікна, якщо таке існує.
    const lastWindow = this.#modals.at(-1);
    lastWindow?.classList.add('modal__content--show');
    lastWindow?.classList.remove('modal__content--waiting');

    // Перевірка на наявнісь відкритих вікон.
    if (!this.#modals.length) {
      this.#ref.classList.add('modal--hidden');
    }
  }

  /**
   * Закриває всі відкриті вікна.
   */
  closeAll() {
    this.#ref.classList.add('modal--hidden');
    this.#clearModal();
    this.#removeListeners();
  }

  #addContent(contentRef) {
    setTimeout(() => contentRef.classList.add('modal__content--show'), 1);
    this.#ref.prepend(contentRef);
    this.#modals.push(contentRef);
  }

  #clearModal() {
    this.#modals = [];
    this.#ref.innerHTML = '';
  }

  #backdropClickHandler = evt => {
    if (!evt.target.classList.contains('modal')) return;

    this.closeAll();
  };

  #keyDownHandler = evt => {
    if (evt.key !== 'Escape') return;

    this.closeAll();
  };

  #addListeners() {
    this.#ref.addEventListener('click', this.#backdropClickHandler);
    document.addEventListener('keydown', this.#keyDownHandler);
  }

  #removeListeners() {
    this.#ref.removeEventListener('click', this.#backdropClickHandler);
    document.removeEventListener('keydown', this.#keyDownHandler);
  }
}

export default Modal.getInstance();
