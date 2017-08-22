// packages
import React, {Component} from 'react';
import _ from 'lodash';

// components
import Button from './components/Button/Button';
import Input from './components/Input/Input';
import List from './components/List/List';

/**
 * A container component that is used to wrap a To-do list
 * where the user can interact by adding, removing or editing tasks
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
       * List of the added tasks.
       */
      taskList: [],
      /**
       * Index of a task that its value will be updated
       */
      editingTaskIndex: -1
    };

    // function bindings
    this.addTaskOnButtonClick = this.addTaskOnButtonClick.bind(this);
    this.addTaskOnEnter = this.addTaskOnEnter.bind(this);
    this.editTask = this.editTask.bind(this);
    this.enableEditMode = this.enableEditMode.bind(this);
    this.disableEditMode = this.disableEditMode.bind(this);
    this.removeTask = this.removeTask.bind(this);

    // variables
    this.editingTask = '';
  }

  /**
   * Adding task in task list
   * Task is retrieved from the input text
   * Input is reseted after task submition, in order to add new task
   */
  addTaskOnButtonClick() {
    const task = document.getElementById('add-task').value;
    this.setState({taskList: this.state.taskList.concat([task])});

    document.getElementById('input-task').reset();
  }

  /**
   * Adding task in task list
   * Task is retrieved by the event that triggers the addition
   * Input is reseted after task submition, in order to add new task
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
   * Editing task.
   * @param  {object} e keyboard type event
   */
  editTask(e) {
    this.editingTask = e.target.value;
  }

  /**
   * Enable task editing
   * @param  {object} e click event
   */
  enableEditMode(e) {
    this.setState({editingTaskIndex: Number(e.target.dataset.index)});
  }

  /**
   * Delete selected task from task list
   * @param  {string} task task to be removed
   */
  removeTask(task) {
    this.setState(prevState => {
      prevState.taskList.splice(prevState.taskList.indexOf(task), 1);
      return {taskList: prevState.taskList};
    });
  }

  /**
   * Submit task
   * @param  {object} e Event
   */
  disableEditMode(e) {
    _.debounce(() => {
      if (e.key === 'Enter') {
        const editingTaskList = _.clone(this.state.taskList);
        editingTaskList[this.state.editingTaskIndex] = e.target.value;
  
        this.setState({editingTaskIndex: -1, taskList: editingTaskList});
      }
    }, 250)();
  }

  /**
   * Render the App to the user's web page
   * @return {object} the displayed to-do interactive list
   */
  render() {
    let taskElem;

    const listItems = this.state.taskList.map((item, index) => {
      if (this.state.editingTaskIndex !== index) {
        taskElem = (
          <textbox onClick={this.enableEditMode} data-index={index}>{item}</textbox>
        );
      } else {
        // Edit mode
        taskElem = (
          <input type="text" value={item} onChange={this.editTask} onKeyPress={this.disableEditMode} />
        );
      }

      return (
        <li key={`${item}-${index}`}>
          <Button onClick={this.removeTask} text="Remove" type="submit" width="65px" clickData={item} />
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
