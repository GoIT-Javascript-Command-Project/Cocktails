import CocktailDetailsContent from './js/modal/CocktailDetailsContent';
import CocktailAPI from './js/services/cocktailsAPI';
import Modal from './js/modal/Modal';

document.querySelector('.test').addEventListener('click', () => {
  const f = new CocktailAPI();

  f.getOneRandomCocktail().then(data => {
    console.log(data);
    const m1 = new CocktailDetailsContent(data);

    Modal.show(m1.getContentRef());
  });
});
