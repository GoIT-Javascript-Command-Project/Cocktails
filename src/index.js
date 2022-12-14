import FavoriteIngredients from './js/FavoriteIngredients';
import PageController, { pages } from './js/PageController';
import LocalStorage from './js/services/localStorage';
import FavoriteCocktails from './js/FavoriteCocktais';
import { mobileMenuInit } from './js/mobile-menu';
import { themeInit } from './js/color-switch';

mobileMenuInit();
themeInit();

PageController.addPage(pages.FAVORITE_COCKTAILS, new FavoriteCocktails());
PageController.addPage(pages.FAVORITE_INGREDIENTS, new FavoriteIngredients());
PageController.goTo(
  pages.FAVORITE_INGREDIENTS,
  LocalStorage.getFavoriteIngredients()
);
PageController.goTo(
  pages.FAVORITE_COCKTAILS,
  LocalStorage.getFavoriteCocktails()
);
