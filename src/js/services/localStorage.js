/**
 * example!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * const example = new LocalStorage;
 * example.setFavoriteIngredients(yourData);
 * const favoriteIngredientsMarkup = example.getFavoriteIngredients();
 * favoriteIngredientsMarkup.map(......)
 * example!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 */
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const THEME_KEY = 'theme';
const FAVORITE_COCKTAILS = 'favoriteCocktails';
const FAVORITE_INGREDIENTS = 'favoriteIngredients';
class LocalStorage {
    getTheme() {
        return localStorage.getItem(THEME_KEY) || '';
    }
    setTheme(theme) {
        localStorage.setItem(THEME_KEY, theme);
    }
    getFavoriteIngredients() {
        return JSON.parse(localStorage.getItem(FAVORITE_INGREDIENTS)) || [];

    }
    setFavoriteIngredients(data) {
        const favoriteIngredients = this.getFavoriteIngredients();
        const ingredients = favoriteIngredients.find(cocks => cocks.id === data.id);
        if (ingredients) {
            return Notify.failure('This ingredient is already in favorite');
        }
        favoriteIngredients.push(data);
        const stringifiedData = JSON.stringify(favoriteIngredients);
        localStorage.setItem(FAVORITE_INGREDIENTS, stringifiedData);
    }

    getFavoriteCocktails() {
        return JSON.parse(localStorage.getItem(FAVORITE_COCKTAILS)) || [];
    }

    setFavoriteCocktails(data) {
        const favoriteCocks = this.getFavoriteCocktails();
        const cocks = favoriteCocks.find(cocks => cocks.id === data.id);
        if (cocks) {
            return Notify.failure('This cocktail is already in favorite');
        }
        favoriteCocks.push(data);
        const stringifiedData = JSON.stringify(favoriteCocks);
        localStorage.setItem(FAVORITE_COCKTAILS, stringifiedData);
    }

}
export default LocalStorage;
