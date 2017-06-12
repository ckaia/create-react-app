import React, {PropTypes} from 'react';

const List = ({items}) => {
	const listItems = items.map(
		(item) => <li key={item.toString()}>{item}</li>
	);

	return (
		<ul>{listItems}</ul>
	)
};

List.propTypes = {
	/**
	 * Items of the list
	 * @type {Array}
	 */
  items: PropTypes.arrayOf(PropTypes.string)
};

export default List;
