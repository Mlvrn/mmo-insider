import PropTypes from 'prop-types';
import { Search } from 'lucide-react';
import { injectIntl } from 'react-intl';

import classes from './style.module.scss';

const SearchBar = ({ onChange, intl: { formatMessage } }) => (
  <div className={classes.searchBar}>
    <input
      type="text"
      placeholder={formatMessage({ id: 'app_search_placeholder' })}
      className={classes.searchInput}
      onChange={onChange}
    />
    <Search className={classes.searchIcon} />
  </div>
);

SearchBar.propTypes = {
  onChange: PropTypes.func,
  intl: PropTypes.object,
};

export default injectIntl(SearchBar);
