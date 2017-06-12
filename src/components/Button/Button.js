import React, {PropTypes} from 'react';

const Button = ({clickData, color, onClick, text, width, type}) => {
  const styles = {
    width: width,
    color: color,
  };

  return (
    <button type={type} style={styles} onClick={clickData}>{text}</button>
  );
};

// Adding properties to Button component
Button.propTypes = {
  /**
   * The data to be passed as param onClick function call
   * @type {any}
   */
  clickData: PropTypes.any.isRequired,
  /**
   * The button color
   * @type {string}
   */
  color: PropTypes.string,
  /**
   * The function to be called on button click
   * @type {function}
   */
  onClick: PropTypes.func,
  /**
   * The button text
   * @type {string}
   */
  text: PropTypes.string.isRequired,
  /**
   * The button width
   * @type {string}
   */
  width: PropTypes.string,
  /**
   * The button type (submit, button are the only allowed values)
   * @param  {[type]} props     [description]
   * @param  {[type]} propsName [description]
   */
  type(props, propName) {
    if(!(propName in props)) {
      return new Error (`Missing ${propName}`)
    }
    if(!(props[propName] === "submit" || props[propName] === "button")) {
      return new Error(`Incorrect value of property "${propName}": ${props[propName]}.\nAllowed values are "submit" or "button".`)
    }
  }
};

Button.defaultProps = {
  color: 'purple',
  width: '50px'
};

export default Button;
