// packages
import React, {Component} from 'react';

// components
import Button from './components/Button/Button';
import Input from './components/Input/Input';
import List from './components/List/List';
import ListItem from './components/ListItem/ListItem';

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
      taskList: [],
      /**
       * Task list item, only the text part
       */
      value: ''
    };

    // function bindings
    this.handleClick = this.handleClick.bind(this);
    this.handleClickText = this.handleClickText.bind(this);
    this.handleUpdateText = this.handleUpdateText.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleKeyPressText = this.handleKeyPressText.bind(this);

    // Distinguish edit mode
    this.editAction = '';

    // Distinguish position of item in task list
    this.index = null;
  }

  componentDidMount() {
    document.getElementById('input-task').addEventListener('keypress', this.handleKeyPress);
    document.getElementById('edit-task').addEventListener('keypress', this.handleKeyPressText);
  }

  componentWillUnmount() {
    document.getElementById('input-task').removeEventListener('keypress', this.handleKeyPress);
    document.getElementById('edit-task').removeEventListener('keypress', this.handleKeyPressText);
  }

  /**
   * To add task on button click and on ENTER
   */
  addTask() {
    const task = document.querySelector('input').value;
    this.setState({taskList: this.state.taskList.concat(task)});

    document.getElementById('input-task').reset();
  }

  /**
   * To edit task on task text click
   * @param  {string} mode either textbox, input or event
   * @param  {string} item user task to be edited
   */
  editTask(mode, item) {
    this.editAction = mode;
    if (mode !== 'event') {
      this.setState({value: item});
    } else {
      const newTaskList = this.state.taskList;
      newTaskList[this.index] = item;
      this.setState({value: item, taskList: newTaskList});
    }
  }

  /**
   * To remove task on button click
   * @param  {string} item User task to be removed
   */
  removeTask(item) {
    const newTaskList = this.state.taskList;
    if (newTaskList.indexOf(item) > -1) {
      newTaskList.splice(newTaskList.indexOf(item), 1);
      this.setState({taskList: newTaskList});
    }
  }

  /**
   * To handle click when button for add or removed are clicked
   * @param  {string} item user task
   */
  handleClick(item) {
    return e => {
      const textContext = e.target.textContent;
      if (textContext === 'Add') {
        this.addTask(item);
      } else if (textContext === 'Remove') {
        this.removeTask(item);
      }
    };
  }

  /**
   * To handle task text click
   * @param  {string} item user task
   */
  handleClickText(item) {
    this.editTask('textbox', item);
  }

  /**
   * To handle user tak editing
   * @param  {string} value User task
   */
  handleUpdateText(value) {
    this.editTask('input', value);
  }

  /**
   * To handle ENTER pressing on add
   * @param  {object} e keyboard event
   */
  handleKeyPress(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      this.addTask();
    }
  }

  /**
   * To handle ENTER pressing on edit
   * @param  {object} e keyboard event
   */
  handleKeyPressText(e) {
    if (e.keyCode === 13) {
      e.preventDefault();

      this.editTask('event', this.state.value);
    }
  }

  /**
   * Render the App to the user's web page
   * @return {object} the displayed to-do interactive list
   */
  render() {
    let listItem = null;

    const listItems = this.state.taskList.map(
      (item, index) => {
        if (this.editAction === 'input' && this.index === index) {
          listItem = <ListItem value={this.state.value} onChangeText={this.handleUpdateText} />;
        } else if (this.editAction === 'textbox' && this.state.value === item) {
          this.index = index;
          listItem = <ListItem value={this.state.value} onChangeText={this.handleUpdateText} />;
        } else if (this.editAction === 'event' && this.index === index) {
          listItem = <textbox onClick={() => this.handleClickText(this.state.value)}>{this.state.value}</textbox>;
        } else {
          listItem = <textbox onClick={() => this.handleClickText(item)}>{item}</textbox>;
        }

        return (
          <li key={`${item}-${index}`}>
            <Button onClick={this.handleClick} text="Remove" type="submit" width="65px" clickData={item} />
            <span>{' '}</span>
            <span>{listItem}</span>
          </li>
        );
      }
    );

    return (
      <div>
        <br />
        <form id="input-task">
          <Input type="text" defaultText="Type your task in here" />
        </form>
        <Button onClick={this.handleClick} text="Add" type="submit" color="royalblue" />
        <br />
        <br />

        <div id="edit-task">
          Tasks
          <List items={listItems} />
        </div>
      </div>
    );
  }
}

export default App;
