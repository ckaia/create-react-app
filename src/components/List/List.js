// packages
import React from 'react';
import PropTypes from 'prop-types';

// style
import style from '../../style/style.css';

const List = ({items}) => (
  <ul id={style.taskList}>{items}</ul>
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
