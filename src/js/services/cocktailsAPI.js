import axios from 'axios';
import { Notify } from 'notiflix';

const instance = axios.create({
  baseURL: 'https://thecocktaildb.com/api/json/v1/1/',
});

export default class CocktailsAPI {
  #getIngredients(obj) {
    const arrayOfIngr = [];
    for (let key in obj) {
      if (key.includes('Ingredient') && obj[key]) {
        arrayOfIngr.push(obj[key]);
      }
    }
    return arrayOfIngr;
  }

  #getMisures(obj) {
    const arrayOfMisures = [];
    for (let key in obj) {
      if (key.includes('Measure') && obj[key]) {
        arrayOfMisures.push(obj[key]);
      }
    }
    return arrayOfMisures;
  }

  #convertCocktailData(response) {
    return response.data.drinks.map(cocktail => {
      const cocktailData = {
        id: cocktail.idDrink,
        image: cocktail.strDrinkThumb,
        name: cocktail.strDrink,
        ingredients: this.#getIngredients(cocktail),
        misure: this.#getMisures(cocktail),
        instructions: cocktail.strInstructions,
      };
      return cocktailData;
    });
  }

  #convertIngredientData(response) {
    const ingredientData = {
      id: response.data.ingredients[0].idIngredient,
      name: response.data.ingredients[0].strIngredient,
      type: response.data.ingredients[0].strType,
      isAlcohol: response.data.ingredients[0].strAlcohol,
      ABV: response.data.ingredients[0].strABV,
      description: response.data.ingredients[0].strDescription,
    };
    return ingredientData;
  }

  static async getOneRandomCocktail() {
    try {
      const response = await instance.get(`random.php`);
      return this.#convertCocktailData(response)[0];
    } catch (error) {
      Notify.warning('Something went wrong... Please try again in few minutes');
    }
  }
  /**
   *
   * @param {number} quantity is required
   * @returns array of objects
   */
  static async getRandomCocktails(quantity) {
    try {
      const callArray = [];
      for (let i = 0; i < quantity; i += 1) {
        callArray.push(this.getOneRandomCocktail());
      }
      const arrayOfRandomCocktails = await Promise.all(callArray);
      return arrayOfRandomCocktails;
    } catch (error) {
      Notify.warning('Something went wrong... Please try again in few minutes');
    }
  }

  /**
   *
   * @param {string} letter is required
   * @returns array of objects | []
   */
  static async getCocktailsByFirstLetter(letter) {
    try {
      const response = await instance.get(`search.php?f=${letter}`);
      if (!response.data.drinks) return [];
      return this.#convertCocktailData(response);
    } catch (error) {
      Notify.warning('Something went wrong... Please try again in few minutes');
    }
  }
  /**
   *
   * @param {string} name is required
   * @returns array of objects | []
   */
  static async getCocktailsByName(name) {
    try {
      const response = await instance.get(`search.php?s=${name}`);
      if (!response.data.drinks) return [];
      return this.#convertCocktailData(response);
    } catch (error) {
      Notify.warning('Something went wrong... Please try again in few minutes');
    }
  }
  /**
   *
   * @param {string} id is required
   * @returns object | undefined
   */
  static async getCocktailInfoById(id) {
    try {
      const response = await instance.get(`lookup.php?i=${id}`);
      if (!response.data.drinks) return;
      return this.#convertCocktailData(response)[0];
    } catch (error) {
      Notify.warning('Something went wrong... Please try again in few minutes');
    }
  }
  /**
   *
   * @param {string} ingredient is required
   * @returns object | undefined
   */
  static async getIngredientInfo(ingredient) {
    try {
      const response = await instance.get(`search.php?i=${ingredient}`);
      if (!response.data.ingredients) return;
      return this.#convertIngredientData(response);
    } catch (error) {
      Notify.warning('Something went wrong... Please try again in few minutes');
    }
  }
}
