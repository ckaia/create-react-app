import React, {Component} from 'react';
import Input from './components/Input/Input';
import Button from './components/Button/Button';
import List from './components/List/List';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {taskList: []};
    this.task = '';
  }

  addTask() {
    this.task = document.querySelector('input').value;
    this.setState({taskList: this.state.taskList.concat(this.task)});

    document.getElementById('input-task').reset();
  }

  handleClick = () => e => {
    this.addTask();
  }

  handleKeyPress = e => {
    if (e.keyCode === 13) {
      e.preventDefault();
      this.addTask();
    }
  }

  render () {
    return (
      <div>
        Add your task below<br />
        <form id='input-task'>
          <Input type='text' defaultText='Type your task in here'/>
        </form><br />

        Click to add your task<br />
        <Button onClick={this.handleClick} text='Add' type='submit' /><br /><br />

				List of tasks added <List items={this.state.taskList} />
      </div>
    )
  }

  componentDidMount() {
	  document.getElementById('input-task').addEventListener('keypress', this.handleKeyPress);
  }

  componentWillUnmount() {
    document.getElementById('input-task').removeEventListener('keypress', this.handleKeyPress);
  }

}

export default App;
