import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';

const List = props => {
  const listItems = props.items.map(
    (item, index) => (
      <li key={`${item}-${index}`}>
        <Button onClick={props.onClick} text="Remove" type="submit" width="65px" clickData={item} />
        <span>{' '}</span>
        <span>{item}</span>
      </li>
    )
  );

  return (
    <ul>{listItems}</ul>
  );
};

List.propTypes = {
  /**
  * The data to be passed as param onClick function call
  */
  clickData: PropTypes.any,
  /**
  * The function to be called on button click
  */
  onClick: PropTypes.func.isRequired,
  /**
   * Items of the list
   */
  items: PropTypes.arrayOf(PropTypes.string)
};

List.defaultProps = {
  clickData: null,
  items: []
};

export default List;
