import CocktailCard from './../CocktailCard';
import mainPage from '../../templates/main-page.hbs';

export default class RenderMainPage {
  render(data) {
    const section = document.createElement('section');
    section.classList.add('section');
    const template = mainPage();
    section.innerHTML = template;
    const cardList = section.querySelector('.pagination__cards');
    cardList.append(
      ...data.map(item => {
        return new CocktailCard(item).render();
      })
    );
    return section;
  }
}
