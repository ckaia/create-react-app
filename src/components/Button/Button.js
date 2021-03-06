// packages
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Button = ({
  backgroundColor,
  borderRadius,
  clickData,
  color,
  onClick,
  text,
  type,
  width
}) => (
  <Content
    backgroundColor={backgroundColor}
    borderRadius={borderRadius}
    color={color}
    width={width}
    type={type}
    onClick={() => onClick(clickData)}
  >{text}</Content>
);

const Content = styled.button`
  background-color: ${props => props.backgroundColor};
  border-radius: ${props => props.borderRadius}px;
  color: ${props => props.color};
  width: ${props => props.width}px;
  font-size: 20px;
  font-family: Arial;
`;

Button.propTypes = {
  /**
   * Colour of background
   */
  backgroundColor: PropTypes.string,
  /**
   * Rounded corners
   */
  borderRadius: PropTypes.string,
  /**
   * The data to be passed as param onClick function call
   */
  clickData: PropTypes.any,
  /**
   * The button color
   */
  color: PropTypes.string.isRequired,
  /**
   * The function to be called on button click
   */
  onClick: PropTypes.func.isRequired,
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
  backgroundColor: 'rgb(255, 255, 255)',
  borderRadius: '5',
  clickData: null,
  width: '50'
};

export default Button;
