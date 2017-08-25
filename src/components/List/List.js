// packages
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const List = ({items}) => (
  <TaskList>{items}</TaskList>
);

const TaskList = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 0;
`;

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
