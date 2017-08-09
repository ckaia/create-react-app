// packages
import React from 'react';
import PropTypes from 'prop-types';

const Input = ({defaultText, width, type}) => {
  const styles = {width};

  return (
    <input placeholder={defaultText} type={type} style={styles} />
  );
};

Input.propTypes = {
  /**
   * The default input text
   */
  defaultText: PropTypes.string.isRequired,
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
  width: '40%'
};

export default Input;
