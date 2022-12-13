import CocktailsAPI from './js/services/CocktailsAPI';
import CocktailCard from './js/CocktailCard';

CocktailsAPI.getRandomCocktails(9).then(data => {
  const ul = document.querySelector('.test');
  ul.innerHTML = '';

  ul.append(
    ...data.map(item => {
      return new CocktailCard(item).render();
    })
  );
});
