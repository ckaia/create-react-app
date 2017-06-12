import React, {Component} from 'react';
import Input from './Input';
import Button from './Button';
import List from './List';

let getUserInput;

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {userList: []};

		// This binding is necessary to make `this` work in the callback
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e) {
		// Get user input
		getUserInput = document.querySelector('input').value;
		this.state.userList.push(getUserInput);

		// Update state
		this.setState({userList: this.state.userList});

		// Reset input
		document.getElementById("my-Form").reset();
	}

  render () {
		// TO-DO: When the input type is password then it should not be allowed
		// the addition of a task to the list?
    return (
      <div>
        Add your task below<br />
				<form id="my-Form">
					<Input type="text" defaultText="Type your task in here" />
				</form><br />

        Click to add your task<br />
				<Button clickData={this.handleClick} text="Add" type="submit" /><br /><br />

				List of tasks added <List items={this.state.userList} />
      </div>
    )
  }

}

export default App;
