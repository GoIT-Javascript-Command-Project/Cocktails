import axios from 'axios';
import { Notify } from 'notiflix';

const instance = axios.create({
  baseURL: 'http://thecocktaildb.com/api/json/v1/1/',
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
    if (response.data.drinks.length === 1) {
      const cocktailData = {
        id: response.data.drinks[0].idDrink,
        image: response.data.drinks[0].strDrinkThumb,
        name: response.data.drinks[0].strDrink,
        ingredients: this.#getIngredients(response.data.drinks[0]),
        misure: this.#getMisures(response.data.drinks[0]),
        instructions: response.data.drinks[0].strInstructions,
      };

      return cocktailData;
    }
    if (response.data.drinks.length > 1) {
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
  }

  #convertIngredientData(response) {
    const ingredientData = {
      id: response.data.ingredients[0].idIngredient,
      name: response.data.ingredients[0].strIngredient,
      type: response.data.ingredients[0].strType,
      isAlcohol: response.data.ingredients[0].strAlcohol,
      description: response.data.ingredients[0].strDescription,
    };
    return ingredientData;
  }

  async getOneRandomCocktail() {
    try {
      const response = await instance.get(`random.php`);
      return this.#convertCocktailData(response);
    } catch (error) {
      Notify.warning('Something went wrong... Please try again in few minutes');
    }
  }
  /**
   *
   * @param {number} quantity is required
   * @returns array of objects
   */
  async getRandomCocktails(quantity) {
    try {
      const callArray = [];
      for (let i = 0; i < quantity; i += 1) {
        callArray.push(this.getOneRandomCocktail());
      }
      const arrayOfRandomCoctails = await Promise.all(callArray);
      return arrayOfRandomCoctails;
    } catch (error) {
      Notify.warning('Something went wrong... Please try again in few minutes');
    }
  }

  /**
   *
   * @param {string} letter is required
   * @returns array of objects
   */
  async getCocktailDataByFirstLetter(letter) {
    try {
      const response = await instance.get(`search.php?f=${letter}`);
      return this.#convertCocktailData(response);
    } catch (error) {
      Notify.warning('Something went wrong... Please try again in few minutes');
    }
  }
  /**
   *
   * @param {string} name is required
   * @returns object
   */
  async getCocktailDataByName(name) {
    try {
      const response = await instance.get(`search.php?s=${name}`);
      return this.#convertCocktailData(response);
    } catch (error) {
      Notify.warning('Something went wrong... Please try again in few minutes');
    }
  }
  /**
   *
   * @param {string} id is required
   * @returns object
   */
  async getCocktailDataById(id) {
    try {
      const response = await instance.get(`lookup.php?i=${id}`);
      return this.#convertCocktailData(response);
    } catch (error) {
      Notify.warning('Something went wrong... Please try again in few minutes');
    }
  }
  /**
   *
   * @param {string} ingredient is required
   * @returns object
   */
  async getIngredientData(ingredient) {
    try {
      const response = await instance.get(`search.php?i=${ingredient}`);
      return this.#convertIngredientData(response);
    } catch (error) {
      Notify.warning('Something went wrong... Please try again in few minutes');
    }
  }
}
