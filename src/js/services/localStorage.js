/**
 * example!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * const example = new LocalStorage;
 * example.setFavoriteIngredients(yourData);
 * const favoriteIngredientsMarkup = example.getFavoriteIngredients();
 * favoriteIngredientsMarkup.map(......)
 * example!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 */
// import { Notify } from 'notiflix/build/notiflix-notify-aio';
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
        const ingredients = favoriteIngredients.find(ingredients => ingredients.id === data.id);
        if (Array.isArray(data) && !this.hasIngredientsInFavorite(ingredients)) {
            favoriteIngredients.push(data);
            const stringifiedData = JSON.stringify(...favoriteIngredients);
            localStorage.setItem(FAVORITE_INGREDIENTS, stringifiedData);
        } else
            if (!ingredients) {
                favoriteIngredients.push(data);
                const stringifiedData = JSON.stringify(favoriteIngredients);
                localStorage.setItem(FAVORITE_INGREDIENTS, stringifiedData);
            }

    }

    getFavoriteCocktails() {
        return JSON.parse(localStorage.getItem(FAVORITE_COCKTAILS)) || [];
    }

    setFavoriteCocktails(data) {
        const favoriteCocks = this.getFavoriteCocktails();
        const cocks = favoriteCocks.find(cocks => cocks.id === data.id);
        if (Array.isArray(data) && !this.hasCocktailsInFavorite(cocks)) {
            favoriteCocks.push(data);
            const stringifiedData = JSON.stringify(...favoriteCocks);
            localStorage.setItem(FAVORITE_COCKTAILS, stringifiedData);
        } else
            if (!cocks) {
                favoriteCocks.push(data);
                const stringifiedData = JSON.stringify(favoriteCocks);
                localStorage.setItem(FAVORITE_COCKTAILS, stringifiedData);
            }

    }
    removeFavoriteCocktails(id) {
        const favoriteCocks = this.getFavoriteCocktails();
        const index = favoriteCocks.findIndex(n => n.id === id);

        if (index !== -1) {
            favoriteCocks.splice(index, 1);
            localStorage.removeItem(FAVORITE_COCKTAILS);
            this.setFavoriteCocktails(favoriteCocks);
        }

    }
    removeFavoriteIngredients(id) {
        const favoriteIngredients = this.getFavoriteIngredients();
        const index = favoriteIngredients.findIndex(n => n.id === id);

        if (index !== -1) {
            favoriteIngredients.splice(index, 1);
            localStorage.removeItem(FAVORITE_INGREDIENTS);
            this.setFavoriteIngredients(favoriteIngredients);
        }

    }
    hasCocktailsInFavorite(id) {
        const favoriteCocks = this.getFavoriteCocktails();
        const hasIdCock = favoriteCocks.find(item => item.id === id);
        if (hasIdCock) {
            true;
        } else {
            false;
        }
    }
    hasIngredientsInFavorite(id) {
        const favoriteIngredients = this.getFavoriteCocktails();
        const hasIdIngredient = favoriteIngredients.find(item => item.id === id);
        if (hasIdIngredient) {
            true;
        } else {
            false;
        }
    }
}

export default LocalStorage;
