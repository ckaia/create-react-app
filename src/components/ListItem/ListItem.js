// packages
import React, {Component} from 'react';
import {PropTypes} from 'prop-types';

/**
 * User's tasks list component. Only the text.
 */
class ListItem extends Component {
  /**
   * Constructor of user's tasks list component
   * @param  {object} props props
   */
  constructor(props) {
    super(props);

    // bind variables
    this.handleChangeInputText = this.handleChangeInputText.bind(this);
  }

  handleChangeInputText(e) {
    this.props.onChangeText(e.target.value);
  }

  render() {
    return (
      <input type="text" value={this.props.value} onChange={this.handleChangeInputText} />
    );
  }
}

ListItem.propTypes = {
  /**
   * Text item of the list
   */
  value: PropTypes.string,
  /**
   * The function to be called on change of input
   */
  onChangeText: PropTypes.func
};

ListItem.defaultProps = {
  value: '',
  onChangeText: null
};

export default ListItem;
