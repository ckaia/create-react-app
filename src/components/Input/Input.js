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
  defaultText: PropTypes.string.isRequired,
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
    if(!(props[propName] === 'text' || props[propName] === 'password')) {
      return new Error(`Incorrect value of property "${propName}": ${props[propName]}.\nAllowed values are "text" or "password".`)
    }
  }
};

Input.defaultProps = {
  width: '40%'
};

export default Input;
