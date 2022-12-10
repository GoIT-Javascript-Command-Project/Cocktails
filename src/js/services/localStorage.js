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
    setFavouriteIngredients(formData) {
        const ingredients = [];
        this.STORAGE_KEY = "favoriteIngredients"
        Object.keys(formData).forEach(item => {
            if (!this.data.includes(item)) {
                ingredients.push(...formData[item]);
            }
        })
        const stringifiedData = JSON.stringify(ingredients);
        localStorage.setItem(this.STORAGE_KEY, stringifiedData);
    }

    getFavoriteCocktails() {
        this.STORAGE_KEY = "favoriteCocks";
        return this.data = JSON.parse(localStorage.getItem(this.STORAGE_KEY)) || [];
    }

    setFavouriteCocktails(formData) {
        this.STORAGE_KEY = "favoriteCocks";
        const cocks = [];
        // const dada = cocks.concat(formData)
        // console.log(dada);

        Object.keys(formData).forEach(item => {
            if (!this.data.includes(item)) {
                cocks.push(...formData[item]);
            }
        })

        const stringifiedData = JSON.stringify(cocks);
        localStorage.setItem(this.STORAGE_KEY, stringifiedData);
    }

}
export default LocalStorage;
