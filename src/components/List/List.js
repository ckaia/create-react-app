import React from 'react';
import PropTypes from 'prop-types';

const List = ({items}) => {
  const listItems = items.map(
    (item, index) => <li key={item + '-' + index}>{item}</li>
  );

  return (
    <ul>{listItems}</ul>
  )
};

List.propTypes = {
  /**
	 * Items of the list
	 */
  items: PropTypes.arrayOf(PropTypes.string)
};

export default List;
