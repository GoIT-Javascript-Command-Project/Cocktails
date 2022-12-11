/**
 * example!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * const example = new LocalStorage;
 * example.setFavoriteIngredients(yourData);
 * const favoriteIngredientsMarkup = example.getFavoriteIngredients();
 * favoriteIngredientsMarkup.map(......)
 * example!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 */
class LocalStorage {
    data = [];
    STORAGE_KEY = ''
    getTheme() {
        this.STORAGE_KEY = "theme";
        return this.data = JSON.parse(localStorage.getItem(this.STORAGE_KEY)) || [];
    }
    setTheme(string) {
        const thems = [];
        this.STORAGE_KEY = "theme";
        if (!this.data.includes(string)) {
            thems.push(string);
        }
        const stringifiedData = JSON.stringify(thems.join(""));
        localStorage.setItem(this.STORAGE_KEY, stringifiedData);
    }
    getFavoriteIngredients() {
        this.STORAGE_KEY = "favoriteIngredients";
        return this.data = JSON.parse(localStorage.getItem(this.STORAGE_KEY)) || [];

    }
    setFavoriteIngredients(data) {
        const ingredients = [];
        this.STORAGE_KEY = "favoriteIngredients"
        for (let i = 0; i < Object.values(data).length; i++) {
            if (ingredients.indexOf(Object.values(data)[i]) === -1) {
                ingredients.push(...Object.values(data)[i]);
            }
        }

        const stringifiedData = JSON.stringify(ingredients);
        localStorage.setItem(this.STORAGE_KEY, stringifiedData);
    }

    getFavoriteCocktails() {
        this.STORAGE_KEY = "favoriteCocks";
        return this.data = JSON.parse(localStorage.getItem(this.STORAGE_KEY)) || [];
    }

    setFavoriteCocktails(data) {
        const cocks = [];
        this.STORAGE_KEY = "favoriteCocks";
        for (let i = 0; i < Object.values(data).length; i++) {
            if (cocks.indexOf(Object.values(data)[i]) === -1) {
                cocks.push(...Object.values(data)[i]);
            }
        }

        const stringifiedData = JSON.stringify(cocks);
        localStorage.setItem(this.STORAGE_KEY, stringifiedData);
    }


}
export default LocalStorage;
