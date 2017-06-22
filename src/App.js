import React, {Component} from 'react';
import Input from './components/Input/Input.jsx';
import Button from './components/Button/Button.jsx';
import List from './components/List/List.jsx';

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

  removeTask(item) {
    const newTaskList = this.state.taskList;
    if (newTaskList.indexOf(item) > -1) {
      newTaskList.splice(newTaskList.indexOf(item), 1);
      this.setState({taskList: newTaskList})
    }
  }

  handleClick = item => e => {
    if (e.target.textContent === 'Add') {
      this.addTask();
    } else if (e.target.textContent === 'Remove') {
      this.removeTask(item);
    }
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
        Add your task below
        <br />
        <form id='input-task'>
          <Input type='text' defaultText='Type your task in here'/>
        </form>
        <br />

        Click to add your task
        <br />
        <Button onClick={this.handleClick} text='Add' type='submit' color='royalblue' />
        <br />
        <br />

				Tasks
        <List items={this.state.taskList} onClick={this.handleClick} />
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
