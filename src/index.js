import RenderMainPage from './js/render/main-page';
import RenderSearchPage from './js/render/search-page';
import PageController, { pages } from './js/PageController';
import FavoriteCocktails from './js/FavoriteCocktais';
import CocktailsAPI from './js/services/cocktailsAPI';

PageController.addPage(pages.HOME, new RenderMainPage());
PageController.addPage(pages.SEARCH, new RenderSearchPage());
PageController.addPage(pages.FAVORITE_COCKTAILS, new FavoriteCocktails());
CocktailsAPI.getRandomCocktails(9).then(data =>
  PageController.goTo(pages.HOME, data)
);
