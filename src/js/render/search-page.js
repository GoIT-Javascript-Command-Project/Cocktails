import Pagination from '../pagination/pagination';
import searchPage from '../../templates/search-page.hbs';
import svg from '../../images/icons.svg';

export default class RenderSearchPage {
  render(data = [], itemsPerPage = 9) {
    const section = document.createElement('section');
    const markUp = searchPage({
      'arrow-svg': `${svg}#pagination-arrow-icon`,
      'fail-svg': `${svg}#not-found`,
    });

    section.classList.add('section');
    section.innerHTML = markUp;
    const pagination = new Pagination(section, data, itemsPerPage);
    pagination.init();

    return section;
  }
}
