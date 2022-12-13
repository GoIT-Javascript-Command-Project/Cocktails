const buttonList = document.querySelector('.pagination__buttons');
const cardList = document.querySelector('.pagination__cards');
const nextButton = document.querySelector('#next-button');
const prevButton = document.querySelector('#prev-button');

export default class Pagination {
  constructor(arrayOfItems, itemsPerPage, template) {
    this.arrayOfItems = arrayOfItems;
    this.itemsPerPage = itemsPerPage;
    this.template = template;
    this.numberOfPages = Math.ceil(arrayOfItems.length / itemsPerPage);
    this.currentPage = 0;
  }

  init() {
    this.#createMarkUp(this.template);
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

  #createMarkUp(template) {
    cardList.innerHTML = this.arrayOfItems
      .map(item => {
        return template;
      })
      .join('');
  }
  #showCurrentPage(numberOfPage) {
    this.currentPage = numberOfPage;
    this.#arrowButtonsStatus();
    const prevRange = (numberOfPage - 1) * this.itemsPerPage;
    const currentRange = numberOfPage * this.itemsPerPage;
    const itemsList = document.querySelectorAll('li');
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
        buttons += `<span>...</span>`;
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
        buttons += `<span>...</span>`;
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
