import React, {PropTypes} from 'react';

const Input = ({defaultText, width, type}) => {
  const styles = {width}; // Shorthand

  return (
    <input placeholder={defaultText} type={type} style={styles} />
  );
}

Input.propTypes = {
  /**
   * The default input text
   */
  defaultText: PropTypes.string.isRequired,
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
  },
  /**
   * The input width
   */
  width: PropTypes.string
};

Input.defaultProps = {
  width: '40%'
};

export default Input;
