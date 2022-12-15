import sectionTemplate from '../templates/section-template.hbs';
import IngredientCard from './IngredientCard';

export default class FavoriteIngredients {
  #refs = null;
  #contentRef = null;
  #property = {
    title: 'Favorite ingredients',
    classList: 'section',
    notFound:
      "<p class='section__not-found'>You haven't added any favorite ingridients yet.</p>",
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

  render(data = []) {
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
        return new IngredientCard(cocktail, true).render();
      })
    );

    return this.#contentRef;
  }
}
