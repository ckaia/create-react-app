// packages
import React, {Component} from 'react';

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
  }

  /**
   * To handle click when button for add or removed are clicked
   * @param  {string} task user task
   */
  addTaskOnButtonClick(task) {
    //const task = document.getElementById('add-task').value;
    this.setState({taskList: this.state.taskList.concat([task])});

    document.getElementById('input-task').reset();
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
   * To handle ENTER pressing on add
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
   * Render the App to the user's web page
   * @return {object} the displayed to-do interactive list
   */
  render() {
    const listItems = this.state.taskList.map((item, index) => (
      <li key={`${item}-${index}`}>
        <Button
          onClick={this.removeTaskOnButtonClick}
          text="Remove"
          type="submit"
          width="65px"
          clickData={item}
        />
        <span>{' '}</span>
        <span>{item}</span>
      </li>
    ));

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
            clickData={document.getElementById('add-task') ? document.getElementById('add-task').value : ''}
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
