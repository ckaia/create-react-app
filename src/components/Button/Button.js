import React from 'react';
import PropTypes from 'prop-types';

const Button = ({clickData, color, onClick, text, type, width}) => {
  const styles = {
    width: width,
    color: color
  };

  return (
    <button type={type} style={styles} onClick={clickData}>{text}</button>
  );
};

Button.propTypes = {
  /**
   * The data to be passed as param onClick function call
   */
  clickData: PropTypes.any.isRequired,
  /**
   * The button color
   */
  color: PropTypes.string,
  /**
   * The function to be called on button click
   */
  onClick: PropTypes.func,
  /**
   * The button text
   */
  text: PropTypes.string.isRequired,
  /**
   * The button type (submit, button are the only allowed values)
   */
  type: PropTypes.oneOf(['submit', 'button']).isRequired,
  /**
   * The button width
   */
  width: PropTypes.string
};

Button.defaultProps = {
  color: 'purple',
  width: '50px'
};

export default Button;
