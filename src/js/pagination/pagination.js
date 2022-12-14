import CocktailCard from './../CocktailCard';

export default class Pagination {
  constructor(section, arrayOfItems, itemsPerPage) {
    this.arrayOfItems = arrayOfItems;
    this.itemsPerPage = itemsPerPage;
    this.numberOfPages = Math.ceil(
      this.arrayOfItems.length / this.itemsPerPage
    );
    this.currentPage = 0;
    this.section = section;
    this.refs = {};
  }
  initToFavorite() {
    const { refs } = this;
    refs.paginationContainer = this.section.querySelector(
      '.pagination__container'
    );
    refs.buttonList = this.section.querySelector('.pagination__buttons');
    refs.prevButton = this.section.querySelector('#prev-button');
    refs.nextButton = this.section.querySelector('#next-button');
    if (this.arrayOfItems.length <= this.itemsPerPage) {
      refs.paginationContainer.classList.add('hidden');
    } else {
      refs.paginationContainer.classList.remove('hidden');
    }

    this.#showCurrentPage(1);
    this.#rebuildButtonList(this.currentPage, this.numberOfPages);
    refs.buttonList.addEventListener('click', event => {
      if (event.target.classList.contains('pagination__number')) {
        this.currentPage = Number(event.target.getAttribute('page-index'));
        this.#showCurrentPage(this.currentPage);
        this.#rebuildButtonList(this.currentPage, this.numberOfPages);
      }
    });
    refs.prevButton.addEventListener('click', () => {
      this.#showCurrentPage(this.currentPage - 1);
      this.#rebuildButtonList(this.currentPage, this.numberOfPages);
    });
    refs.nextButton.addEventListener('click', () => {
      this.#showCurrentPage(this.currentPage + 1);
      this.#rebuildButtonList(this.currentPage, this.numberOfPages);
    });
  }
  init() {
    const { refs } = this;
    refs.paginationContainer = this.section.querySelector(
      '.pagination__container'
    );
    refs.mainTitle = this.section.querySelector('.section__title--success');
    refs.paginationResult = this.section.querySelector('.fail-result');
    refs.buttonList = this.section.querySelector('.pagination__buttons');
    refs.cardList = this.section.querySelector('.pagination__cards');
    refs.prevButton = this.section.querySelector('#prev-button');
    refs.nextButton = this.section.querySelector('#next-button');
    if (this.arrayOfItems.length === 0) {
      refs.cardList.innerHTML = '';
      refs.paginationContainer.classList.add('hidden');
      refs.mainTitle.classList.add('hidden');
      refs.paginationResult.classList.remove('hidden');
      return;
    }
    if (this.arrayOfItems.length <= this.itemsPerPage) {
      refs.paginationContainer.classList.add('hidden');
      refs.mainTitle.textContent = 'Searching results';
      refs.mainTitle.classList.remove('hidden');
      refs.paginationResult.classList.add('hidden');
      return this.#createMarkUp();
    }
    refs.paginationResult.classList.add('hidden');
    refs.mainTitle.textContent = 'Searching results';
    refs.paginationContainer.classList.remove('hidden');
    this.#createMarkUp();
    this.#showCurrentPage(1);
    this.#rebuildButtonList(this.currentPage, this.numberOfPages);
    refs.buttonList.addEventListener('click', event => {
      if (event.target.classList.contains('pagination__number')) {
        this.currentPage = Number(event.target.getAttribute('page-index'));
        this.#showCurrentPage(this.currentPage);
        this.#rebuildButtonList(this.currentPage, this.numberOfPages);
      }
    });
    refs.prevButton.addEventListener('click', () => {
      this.#showCurrentPage(this.currentPage - 1);
      this.#rebuildButtonList(this.currentPage, this.numberOfPages);
    });
    refs.nextButton.addEventListener('click', () => {
      this.#showCurrentPage(this.currentPage + 1);
      this.#rebuildButtonList(this.currentPage, this.numberOfPages);
    });
  }

  #createMarkUp() {
    this.refs.cardList.innerHTML = '';
    this.refs.cardList.append(
      ...this.arrayOfItems.map(item => {
        return new CocktailCard(item).render();
      })
    );
  }
  #showCurrentPage(numberOfPage) {
    this.currentPage = numberOfPage;
    this.#arrowButtonsStatus();
    const prevRange = (numberOfPage - 1) * this.itemsPerPage;
    const currentRange = numberOfPage * this.itemsPerPage;
    const itemsList = this.section.querySelectorAll('li');
    itemsList.forEach((item, index) => {
      item.classList.add('hidden');
      if (index >= prevRange && index < currentRange) {
        item.classList.remove('hidden');
      }
    });
  }
  #createButton(number) {
    if (number === this.currentPage) {
      return `<button class="pagination__number active" page-index="${number}">${number}</button>`;
    }
    return `<button class="pagination__number" page-index="${number}">${number}</button>`;
  }

  #rebuildButtonList(currentPage, numberOfPages) {
    let buttons = '';
    if (numberOfPages <= 6) {
      for (let i = 1; i <= numberOfPages; i += 1) {
        buttons += this.#createButton(i);
      }
    } else {
      buttons += this.#createButton(1);

      if (currentPage > 3) {
        buttons += `<span class="pagination__dots">...</span>`;
      }

      if (currentPage === numberOfPages) {
        buttons += this.#createButton(currentPage - 2);
      }
      if (currentPage > 2) {
        buttons += this.#createButton(currentPage - 1);
      }

      if (currentPage !== 1 && currentPage !== numberOfPages) {
        buttons += this.#createButton(currentPage);
      }

      if (currentPage < numberOfPages - 1) {
        buttons += this.#createButton(currentPage + 1);
      }

      if (currentPage === 1) {
        buttons += this.#createButton(currentPage + 2);
      }

      if (currentPage < numberOfPages - 2) {
        buttons += `<span class="pagination__dots">...</span>`;
      }
      if (numberOfPages > 1) {
        buttons += this.#createButton(numberOfPages);
      }
    }
    this.refs.buttonList.innerHTML = buttons;
  }
  #disableButton(button) {
    button.classList.add('disabled');
    button.setAttribute('disabled', true);
  }
  #enableButton(button) {
    button.classList.remove('disabled');
    button.removeAttribute('disabled');
  }
  #arrowButtonsStatus() {
    if (this.currentPage === 1) {
      this.#disableButton(this.refs.prevButton);
    } else {
      this.#enableButton(this.refs.prevButton);
    }
    if (this.numberOfPages === this.currentPage) {
      this.#disableButton(this.refs.nextButton);
    } else {
      this.#enableButton(this.refs.nextButton);
    }
  }
}
