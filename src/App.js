// packages
import React, {Component} from 'react';
import _ from 'lodash';

// components
import Button from './components/Button/Button';
import Input from './components/Input/Input';
import List from './components/List/List';

/**
 * A container component that is used to wrap a To-do list
 * where the user can interact by adding, removing or editing tasks.
 */
class App extends Component {
  /**
   * The constructor of App component
   * @param  {object} props props
   */
  constructor(props) {
    super(props);

    this.state = {
      /**
       * List of tasks
       */
      taskList: []
    };

    // function bindings
    this.addTaskOnButtonClick = this.addTaskOnButtonClick.bind(this);
    this.removeTaskOnButtonClick = this.removeTaskOnButtonClick.bind(this);
    this.addTaskOnEnter = this.addTaskOnEnter.bind(this);
    this.editTask = this.editTask.bind(this);
    this.allowEditingTask = this.allowEditingTask.bind(this);
    this.submitEditingTask = this.submitEditingTask.bind(this);

    // variables
    this.editingTaskIndex = -1;
  }

  /**
   * Add task to task list. The task is retrieved from the input text.
   * The input value is reseted after the state update in order the user to add new task again.
   * @param  {string} task user task
   */
  addTaskOnButtonClick() {
    const task = document.getElementById('add-task').value;
    this.setState({taskList: this.state.taskList.concat([task])});

    document.getElementById('input-task').reset();
  }

  /**
   * Add task to task list. The task is retrieved by the event that triggers the addition.
   * The input value is reseted after the state update in order the user to add new task again.
   * @param  {object} e keyboard event
   */
  addTaskOnEnter(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.setState({taskList: this.state.taskList.concat(e.target.value)});

      document.getElementById('input-task').reset();
    }
  }

  /**
   * Allow user to edit the task this a specific index
   * @param  {number} taskIndex Index that points to the task to be edited
   */
  allowEditingTask(taskIndex) {
    this.editingTaskIndex = taskIndex;
    this.setState({taskList: this.state.taskList});
  }

  /**
   * Edit task
   * @param  {object} e Event
   */
  editTask(e) {
    const editingTaskList = _.clone(this.state.taskList);
    editingTaskList[this.editingTaskIndex] = e.target.value;

    this.setState({taskList: editingTaskList});
    // this.setState(prevState => {
    //   prevState.taskList[this.editingTaskIndex] = e.target.value;
    //   return {taskList: prevState.taskList};
    // });
  }

  /**
   * Updates task list. Removes the task that is selected.
   * @param  {string} task task to be removed
   */
  removeTaskOnButtonClick(task) {
    this.setState(prevState => {
      prevState.taskList.splice(prevState.taskList.indexOf(task), 1);
      return {taskList: prevState.taskList};
    });
  }

  /**
   * Submit task
   * @param  {object} e Event
   */
  submitEditingTask(e) {
    if (e.key === 'Enter') {
      this.editingTaskIndex = -1;
      this.setState({taskList: this.state.taskList});
    }
  }

  /**
   * Render the App to the user's web page
   * @return {object} the displayed to-do interactive list
   */
  render() {
    let taskElem;

    const listItems = this.state.taskList.map((item, index) => {
      // Task is presented
      if (this.editingTaskIndex !== index) {
        taskElem = <textbox onClick={() => this.allowEditingTask(index)}>{item}</textbox>;
      } else {
        // Task is editable
        taskElem = <input type="text" value={item} onChange={this.editTask} onKeyPress={this.submitEditingTask} />;
      }

      return (
        <li key={`${item}-${index}`}>
          <Button onClick={this.removeTaskOnButtonClick} text="Remove" type="submit" width="65px" clickData={item} />
          <span>{' '}</span>
          {taskElem}
        </li>
      );
    });

    return (
      <div>
        <h2>Task list</h2>
        <div>
          <form id="input-task">
            <Input type="text" defaultText="Task..." onKeyPress={this.addTaskOnEnter} id="add-task" />
          </form>
          <Button
            onClick={this.addTaskOnButtonClick}
            text="Add"
            type="submit"
            color="royalblue"
          />
        </div>
        <div>
          <h4>Tasks</h4>
          <List items={listItems} />
        </div>
      </div>
    );
  }
}

export default App;
