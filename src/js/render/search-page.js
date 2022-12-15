import Pagination from '../pagination/pagination';
import searchPage from '../../templates/search-page.hbs';
import svg from '../../images/icons.svg';
export default class RenderSearchPage {
  render(data) {
    const section = document.createElement('section');
    section.classList.add('section');
    const markUp = searchPage({
      'arrow-svg': `${svg}#pagination-arrow-icon`,
      'fail-svg': `${svg}#not-found`,
    });
    section.innerHTML = markUp;
    const pagination = new Pagination(section, data, 9);
    pagination.init();
    return section;
  }
}
