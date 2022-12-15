import { Notify } from 'notiflix';

const THEME_KEY = 'theme';
const FAVORITE_COCKTAILS = 'favoriteCocktails';
const FAVORITE_INGREDIENTS = 'favoriteIngredients';

class LocalStorage {
  static getFavorite(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
  }

  static setToFavorite(key, data) {
    let result = [];

    if (Array.isArray(data)) {
      result = [...data];
    } else {
      result = LocalStorage.getFavorite(key);
      const findData = result.find(item => item.id === data.id);

      if (findData) {
        console.log(data);
        Notify.warning(`${data?.name} already in favorite!`);
        return;
      }
      result.push(data);
    }

    localStorage.setItem(key, JSON.stringify(result));
  }

  static removeFromFavorite(key, id) {
    const newFavorites = LocalStorage.getFavorite(key).filter(
      item => item.id !== id
    );

    LocalStorage.setToFavorite(key, newFavorites);

    return newFavorites;
  }

  static hasInFavorite(key, id) {
    return (
      LocalStorage.getFavorite(key).find(item => item.id === id) !== undefined
    );
  }

  static getTheme() {
    return localStorage.getItem(THEME_KEY) || 'light';
  }

  static setTheme(theme) {
    localStorage.setItem(THEME_KEY, theme);
  }

  static getFavoriteIngredients() {
    return LocalStorage.getFavorite(FAVORITE_INGREDIENTS);
  }

  static setFavoriteIngredients(data) {
    LocalStorage.setToFavorite(FAVORITE_INGREDIENTS, data);
  }

  static removeFavoriteIngredient(id) {
    return LocalStorage.removeFromFavorite(FAVORITE_INGREDIENTS, id);
  }

  static hasFavoriteIngredient(id) {
    return LocalStorage.hasInFavorite(FAVORITE_INGREDIENTS, id);
  }

  static getFavoriteCocktails() {
    return LocalStorage.getFavorite(FAVORITE_COCKTAILS);
  }

  static setFavoriteCocktails(data) {
    LocalStorage.setToFavorite(FAVORITE_COCKTAILS, data);
  }

  static removeFavoriteCocktail(id) {
    return LocalStorage.removeFromFavorite(FAVORITE_COCKTAILS, id);
  }

  static hasFavoriteCocktail(id) {
    return LocalStorage.hasInFavorite(FAVORITE_COCKTAILS, id);
  }
}

export default LocalStorage;
