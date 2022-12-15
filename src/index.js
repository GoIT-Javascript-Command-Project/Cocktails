import RenderMainPage from './js/render/main-page';
import RenderSearchPage from './js/render/search-page';
import PageController, { pages } from './js/PageController';
import FavoriteCocktails from './js/FavoriteCocktais';
import { mobileMenuInit } from './js/mobile-menu';
import { themeInit } from './js/themeSwitcher';
import FavoriteIngredients from './js/FavoriteIngredients';
import { heroInit } from './js/hero/hero';

heroInit();
mobileMenuInit();
themeInit();

PageController.addPage(pages.HOME, new RenderMainPage());
PageController.addPage(pages.SEARCH, new RenderSearchPage());
PageController.addPage(pages.FAVORITE_COCKTAILS, new FavoriteCocktails());
PageController.addPage(pages.FAVORITE_INGREDIENTS, new FavoriteIngredients());
PageController.gotoHomePage();
