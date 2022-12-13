import CocktailDetailsContent from './js/modal/CocktailDetailsContent';
import CocktailAPI from './js/services/cocktailsAPI';
import Modal from './js/modal/Modal';

document.querySelector('.test').addEventListener('click', () => {
  CocktailAPI.getOneRandomCocktail().then(data => {
    const m1 = new CocktailDetailsContent(data);

    Modal.show(m1.getContentRef());
  });
});
