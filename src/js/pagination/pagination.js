import CocktailCard from './../CocktailCard';
const paginationContainer = document.querySelector('.pagination__container');
const mainTitle = document.querySelector('.section__title--success');
const paginationResult = document.querySelector('.fail-result');
const buttonList = document.querySelector('.pagination__buttons');
const cardList = document.querySelector('.pagination__cards');
const nextButton = document.querySelector('#next-button');
const prevButton = document.querySelector('#prev-button');

export default class Pagination {
  constructor(arrayOfItems, itemsPerPage) {
    this.arrayOfItems = arrayOfItems;
    this.itemsPerPage = itemsPerPage;
    this.numberOfPages = Math.ceil(
      this.arrayOfItems.length / this.itemsPerPage
    );
    this.currentPage = 0;
  }

  init() {
    if (this.arrayOfItems.length === 0) {
      cardList.innerHTML = '';
      paginationContainer.classList.add('hidden');
      mainTitle.classList.add('hidden');
      paginationResult.classList.remove('hidden');
      return;
    }
    if (this.arrayOfItems.length <= this.itemsPerPage) {
      paginationContainer.classList.add('hidden');
      mainTitle.textContent = 'Searching results';
      mainTitle.classList.remove('hidden');
      paginationResult.classList.add('hidden');
      return this.#createMarkUp();
    }
    paginationResult.classList.add('hidden');
    mainTitle.textContent = 'Searching results';
    paginationContainer.classList.remove('hidden');
    this.#createMarkUp();
    this.#showCurrentPage(1);
    this.#rebuildButtonList(this.currentPage, this.numberOfPages);
    buttonList.addEventListener('click', event => {
      if (event.target.classList.contains('pagination__number')) {
        this.currentPage = Number(event.target.getAttribute('page-index'));
        this.#showCurrentPage(this.currentPage);
        this.#rebuildButtonList(this.currentPage, this.numberOfPages);
      }
    });
    prevButton.addEventListener('click', () => {
      this.#showCurrentPage(this.currentPage - 1);
      this.#rebuildButtonList(this.currentPage, this.numberOfPages);
    });
    nextButton.addEventListener('click', () => {
      this.#showCurrentPage(this.currentPage + 1);
      this.#rebuildButtonList(this.currentPage, this.numberOfPages);
    });
  }

  #createMarkUp() {
    cardList.innerHTML = '';
    cardList.append(
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
    const itemsList = document.querySelectorAll('.cocktail-card');
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
    buttonList.innerHTML = buttons;
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
      this.#disableButton(prevButton);
    } else {
      this.#enableButton(prevButton);
    }
    if (this.numberOfPages === this.currentPage) {
      this.#disableButton(nextButton);
    } else {
      this.#enableButton(nextButton);
    }
  }
}
