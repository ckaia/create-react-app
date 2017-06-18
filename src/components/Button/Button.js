import React, {PropTypes} from 'react';

const Button = ({clickData, color, onClick, text, type, width}) => {
  const styles = {
    width: width,
    color: color,
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
   * @param  {[type]} props     Properties
   * @param  {[type]} propsName Property name
   */
  type(props, propName) {
    if(!(propName in props)) {
      return new Error (`Missing ${propName}`)
    }
    if(!(props[propName] === "submit" || props[propName] === "button")) {
      return new Error(`Incorrect value of property "${propName}": ${props[propName]}.\nAllowed values are "submit" or "button".`)
    }
  },
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
