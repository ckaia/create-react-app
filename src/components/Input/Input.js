// packages
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Input = ({onKeyPress, defaultText, width, type, id}) => {
  const styles = {width};

  return (
    <Content onKeyPress={onKeyPress} placeholder={defaultText} type={type} style={styles} id={id} />
  );
};

const Content = styled.input`
  font-size: 20px;
  font-family: Arial;
`;

Input.propTypes = {
  /**
   * The default input text
   */
  defaultText: PropTypes.string.isRequired,
  /**
   * The input identifier
   */
  id: PropTypes.string,
  /**
   * The function to be called on key press
   */
  onKeyPress: PropTypes.func,
  /**
   * The input type (text, password are the only allowed values)
   */
  type: PropTypes.oneOf(['text', 'password']).isRequired,
  /**
   * The input width
   */
  width: PropTypes.string
};

Input.defaultProps = {
  id: '',
  onKeyPress: null,
  width: '40%'
};

export default Input;
