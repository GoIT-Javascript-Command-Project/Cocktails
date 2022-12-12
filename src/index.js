import CocktailDetailsContent from './js/modal/CocktailDetailsContent';
import Modal from './js/modal/Modal';

document.querySelector('.test').addEventListener('click', () => {
  const m1 = new CocktailDetailsContent({
    id: '1',
    ingredients: ['Tequila', 'Triple sec', 'Lime juice', 'Salt'],
  });

  Modal.show(m1.getContentRef());
});
