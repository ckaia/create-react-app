import React from 'react';
import PropTypes from 'prop-types';

const List = ({items}) => (
  <ul>{items}</ul>
);

List.propTypes = {
  /**
   * Items of the list
   */
  items: PropTypes.arrayOf(PropTypes.object).isRequired
};

List.defaultProps = {
  items: []
};

export default List;
