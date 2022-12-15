import sectionTemplate from '../templates/section-template.hbs';
import CocktailCard from './CocktailCard';
import Pagination from './pagination/pagination';
import svg from '../images/icons.svg';

export default class FavoriteCocktails {
  #refs = null;
  #contentRef = null;
  #property = {
    title: 'Favorite cocktails',
    classList: 'section',
    arrowSvg: `${svg}#pagination-arrow-icon`,
    notFound:
      "<p class='section__not-found'>You haven't added any favorite cocktails yet</p>",
  };

  constructor() {
    this.#init();
  }

  #init() {
    const container = document.createElement('div');
    container.innerHTML = sectionTemplate(this.#property).trim();

    this.#contentRef = container.firstChild;
    this.#refs = {
      list: this.#contentRef.querySelector('.list'),
      notFound: this.#contentRef.querySelector('.not-found'),
    };
  }

  render(data = [], itemsPerPage = 9, callback = null) {
    // Відображення повідомлення про відсутність єлементів
    if (data.length) {
      this.#refs.notFound.classList.add('not-found--hidden');
    } else {
      this.#refs.notFound.classList.remove('not-found--hidden');
    }

    // Оновлення списку к єлементами
    this.#refs.list.innerHTML = '';
    this.#refs.list.append(
      ...data.map(cocktail => {
        return new CocktailCard(cocktail, true, callback).render();
      })
    );
    const pagination = new Pagination(this.#contentRef, data, itemsPerPage);
    pagination.initToFavorite();
    return this.#contentRef;
  }
}
