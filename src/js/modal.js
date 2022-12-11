const cocktail = {
  id: '11007',
  image:
    'https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg',
  name: 'Margarita',
  ingredients: ['Tequila', 'Triple sec', 'Lime juice', 'Salt'],
  misure: ['1 1/2 oz ', '1/2 oz ', '1 oz '],
  instructions:
    'Rub the rim of the glass with the lime slice to make the salt stick to it. Take care to moisten only the outer rim and sprinkle the salt on it. The salt should present to the lips of the imbiber and never mix into the cocktail. Shake the other ingredients with ice, then carefully pour into the glass.',
};

export class Modal {
  #modals = [];
  #ref = null;

  constructor() {
    this.#ref = document.querySelector('.modal');
    console.log(this.#ref);
  }

  show(content) {
    this.#ref.classList.remove('modal--hidden');
    this.#modals.push(content);
  }

  close() {
    if (!this.#modals.length) {
      this.closeAll();
    }
  }

  closeAll() {
    this.#ref.classList.add('modal--hidden');
  }

  render() {}
}
