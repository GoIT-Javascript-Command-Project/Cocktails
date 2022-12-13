import makeCocktailCard from '../src/templates/cocktail-card.hbs';
import CocktailsAPI from './services/CocktailsAPI';
makeCocktailCard();
CocktailsAPI.getRandomCocktails(9);
