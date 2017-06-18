import React, {Component} from 'react';
import Input from './components/Input/Input';
import Button from './components/Button/Button';
import List from './components/List/List';

let task;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {taskList: []};

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
	  document.getElementById('task').addEventListener('keypress', this.handleClick);
  }

  handleClick(e) {
    if (document.activeElement.localName === 'button' || e.keyCode === 13) {
      e.preventDefault();

      // Get user input
      task = document.querySelector('input').value;

      // Set state
      this.setState({taskList: this.state.taskList.concat(task)});

      // Reset input
      document.getElementById('task').reset();
    }
  }

  render () {
    return (
      <div>
        Add your task below<br />
        <form id='task'>
          <Input type='text' defaultText='Type your task in here'/>
        </form><br />

        Click to add your task<br />
        <Button clickData={this.handleClick} text='Add' type='submit' /><br /><br />

				List of tasks added <List items={this.state.taskList} />
      </div>
    )
  }

  componentWillUnmount() {
    document.getElementById('task').removeEventListener('keypress', this.handleClick);
  }

}

export default App;
