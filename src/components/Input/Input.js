import React, {PropTypes} from 'react';

const Input = ({defaultText, width, type}) => {
  const styles = {
    width: width,
  };

  return (
    <input placeholder={defaultText} type={type} style={styles} />
  );
}


Input.propTypes = {
  /**
   * The default input text
   * @type {string}
   */
  defaultText: PropTypes.string,
  /**
   * The input width
   * @type {number}
   */
  width: PropTypes.string,
  /**
   * The input type (text, password are the only allowed values)
   * @param  {object} props    Properties
   * @param  {string} propName Property name
   */
  type(props, propName) {
    if(!(propName in props)) {
      return new Error (`Missing ${propName}`)
    }
    if(!(props[propName] === "text" || props[propName] === "password")) {
      return new Error(`Value of property ${propName} is not allowed: ${props[propName]}. Use text or password`)
    }
  }
};

Input.defaultProps = {
  defaultText: 'Type your task in here',
  width: '300px'
};

export default Input;
