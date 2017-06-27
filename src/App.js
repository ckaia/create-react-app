import React, {Component} from 'react';
import Input from './components/Input/Input';
import Button from './components/Button/Button';
import List from './components/List/List';

class App extends Component {
  constructor(props) {
    super(props);
    
    // state variables
    this.state = {taskList: []};
    
    // rest context variables
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    document.getElementById('input-task').addEventListener('keypress', this.handleKeyPress);
  }

  componentWillUnmount() {
    document.getElementById('input-task').removeEventListener('keypress', this.handleKeyPress);
  }

  addTask() {
    const task = document.querySelector('input').value;
    this.setState({taskList: this.state.taskList.concat(task)});
    
    document.getElementById('input-task').reset();
  }

  removeTask(item) {
    const newTaskList = this.state.taskList;
    if (newTaskList.indexOf(item) > -1) {
      newTaskList.splice(newTaskList.indexOf(item), 1);
      this.setState({taskList: newTaskList});
    }
  }

  handleKeyPress(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      this.addTask();
    }
  }

  handleClick = item => e => {
    if (e.target.textContent === 'Add') {
      this.addTask();
    } else if (e.target.textContent === 'Remove') {
      this.removeTask(item);
    }
  }

  render() {
    return (
      <div>
        Add your task below
        <br />
        <form id="input-task">
          <Input type="text" defaultText="Type your task in here" />
        </form>
        <br />

        Click to add your task
        <br />
        <Button onClick={this.handleClick} text="Add" type="submit" color="royalblue" />
        <br />
        <br />

        Tasks
        <List items={this.state.taskList} onClick={this.handleClick} />
      </div>
    );
  }
}

export default App;
