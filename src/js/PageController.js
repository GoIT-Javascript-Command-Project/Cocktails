import throttle from 'lodash.throttle';
import LocalStorage from './services/localStorage';
import CocktailsAPI from './services/cocktailsAPI';
import { hideMenu } from './mobile-menu';

export const pages = {
  HOME: 'home',
  SEARCH: 'search',
  FAVORITE_COCKTAILS: 'favorite-cocktails',
  FAVORITE_INGREDIENTS: 'favourite-ingredients',
};

class PageController {
  #refs = null;
  #currentPage = null;
  #pages = [];
  #itemsPerPage = 0;

  constructor() {
    this.#init();
  }

  static getInstance() {
    if (!this._instance) {
      this._instance = new PageController();
    }

    return this._instance;
  }

  #init() {
    this.#refs = {
      logo: document.querySelector('.logo'),
      mobileLogo: document.querySelector('.mobile__logo'),
      homeLinks: document.querySelectorAll('[data-page="home"]'),
      favoriteCocktails: document.querySelectorAll(
        '[data-page="favorite-cocktails"]'
      ),
      favoriteIngredients: document.querySelectorAll(
        '[data-page="favorite-ingredients"]'
      ),
      hero: {
        container: document.querySelector('.hero'),
        letterList: document.querySelector('.hero__list'),
        mobileSelect: document.querySelector('.hero__select--mob'),
      },
      main: document.querySelector('main'),
      form: document.querySelectorAll('.header form'),
    };

    this.#addListeners();
    this.#getPageSize();
  }

  #addListeners() {
    const {
      form,
      logo,
      mobileLogo,
      homeLinks,
      favoriteCocktails,
      favoriteIngredients,
      hero,
    } = this.#refs;

    window.addEventListener('resize', this.#windowResizeHandler);

    form.forEach(f => {
      f.addEventListener('submit', this.#searchHandler);
    });

    logo.addEventListener('click', this.#homePageHandler);
    mobileLogo.addEventListener('click', this.#homePageHandler);
    homeLinks.forEach(link => {
      link.addEventListener('click', this.#homePageHandler);
    });
    favoriteCocktails.forEach(link => {
      link.addEventListener('click', this.#favoriteCocktailsPageHandler);
    });
    favoriteIngredients.forEach(link => {
      link.addEventListener('click', this.#favoriteIngredientsPageHandler);
    });
    hero.letterList.addEventListener('click', this.#clickLetterHandler);
    hero.mobileSelect.addEventListener('click', this.#clickLetterHandler);
  }

  #windowResizeHandler = throttle(() => {
    this.#getPageSize();
  }, 500);

  #getPageSize() {
    let count = 0;

    if (window.matchMedia('(max-width: 767px)').matches) {
      count = 3;
    } else if (
      window.matchMedia('(min-width: 768px) and (max-width: 1279px)').matches
    ) {
      count = 6;
    } else if (window.matchMedia('(min-width: 1280px)').matches) {
      count = 9;
    }

    if (this.#itemsPerPage === count) return;

    this.#itemsPerPage = count;

    if (this.#currentPage) {
      if (this.#currentPage.name === pages.HOME) {
        this.gotoHomePage();
      } else {
        this.goTo(this.#currentPage.name, this.#currentPage.data);
      }
    }
  }

  #clickLetterHandler = evt => {
    const { target } = evt;
    target.blur();

    if (target.nodeName !== 'BUTTON' && target.nodeName !== 'LI') return;

    const letter = target.textContent.trim();
    CocktailsAPI.getCocktailsByFirstLetter(letter).then(data => {
      this.goTo(pages.SEARCH, data);
    });
  };

  #searchHandler = evt => {
    evt?.preventDefault();

    // Закриття мобільного меню
    hideMenu();

    const query = evt.target.elements.query.value.trim().toLowerCase();

    switch (this.#currentPage.name) {
      case pages.FAVORITE_COCKTAILS:
        {
          const data = LocalStorage.getFavoriteCocktails();

          this.goTo(
            pages.FAVORITE_COCKTAILS,
            data.filter(item => item.name.toLowerCase().includes(query))
          );
        }
        break;
      case pages.FAVORITE_INGREDIENTS:
        {
          const data = LocalStorage.getFavoriteIngredients();

          this.goTo(
            pages.FAVORITE_INGREDIENTS,
            data.filter(item => item.name.toLowerCase().includes(query))
          );
        }
        break;
      case pages.SEARCH:
      case pages.HOME:
        {
          CocktailsAPI.getCocktailsByName(query).then(data => {
            this.goTo(pages.SEARCH, data);
          });
        }
        break;
    }

    // Очищення форми
    evt.target.reset();
  };

  #homePageHandler = evt => {
    evt.preventDefault();

    this.gotoHomePage();
  };

  #favoriteCocktailsPageHandler = evt => {
    evt?.preventDefault();

    this.goTo(pages.FAVORITE_COCKTAILS, LocalStorage.getFavoriteCocktails());
  };

  #favoriteIngredientsPageHandler = evt => {
    evt?.preventDefault();

    this.goTo(
      pages.FAVORITE_INGREDIENTS,
      LocalStorage.getFavoriteIngredients()
    );
  };

  #updateRender() {
    switch (this.#currentPage?.name) {
      case pages.FAVORITE_COCKTAILS:
        {
          this.#favoriteCocktailsPageHandler();
        }
        break;
      case pages.FAVORITE_INGREDIENTS:
        {
          this.#favoriteIngredientsPageHandler();
        }
        break;
    }
  }

  addPage(name, page) {
    const findPage = this.#pages.find(page => page.name === name);

    if (findPage) {
      return;
    }

    this.#pages.push({ name: name, instance: page });
  }

  gotoHomePage() {
    CocktailsAPI.getRandomCocktails(this.#itemsPerPage).then(data => {
      this.goTo(pages.HOME, data);
    });
  }

  goTo(pageName, data = []) {
    const page = this.#pages.find(p => p.name === pageName);
    const content = page?.instance.render(
      data,
      this.#itemsPerPage,
      this.#updateRender.bind(this)
    );

    if (!content) return;

    // Видалення попередньої сторінки
    if (this.#currentPage) {
      this.#currentPage.ref.remove();
    }

    // Відображення героя
    if (pageName === pages.HOME || pageName === pages.SEARCH) {
      this.#refs.hero.container.classList.remove('hero--hidden');
    } else {
      this.#refs.hero.container.classList.add('hero--hidden');
    }

    // Додавання нової сторінку до документу
    this.#refs.main.append(content);
    this.#currentPage = { name: pageName, ref: content, data: data };
  }
}

export default PageController.getInstance();
