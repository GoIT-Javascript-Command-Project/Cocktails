import throttle from 'lodash.throttle';
import RenderMainPage from './js/render/main-page';
import RenderSearchPage from './js/render/search-page';
import PageController, { pages } from './js/PageController';
import FavoriteCocktails from './js/FavoriteCocktais';
import CocktailsAPI from './js/services/cocktailsAPI';
import { mobileMenuInit } from './js/mobile-menu';
import { themeInit } from './js/themeSwitcher';
import FavoriteIngredients from './js/FavoriteIngredients';

mobileMenuInit();
themeInit();

PageController.addPage(pages.HOME, new RenderMainPage());
PageController.addPage(pages.SEARCH, new RenderSearchPage());
PageController.addPage(pages.FAVORITE_COCKTAILS, new FavoriteCocktails());
PageController.addPage(pages.FAVORITE_INGREDIENTS, new FavoriteIngredients());
CocktailsAPI.getRandomCocktails(9).then(data =>
  PageController.goTo(pages.HOME, data)
);

const windowResizeHandler = throttle(event => {
  if (window.matchMedia('(max-width: 767px)').matches) {
    console.log(3);
  } else if (
    window.matchMedia('(min-width: 768px) and (max-width: 1279px').matches
  ) {
    console.log(6);
  } else if (window.matchMedia('(min-width: 1280px)').matches) {
    console.log(9);
  }
}, 500);

window.addEventListener('resize', windowResizeHandler);
