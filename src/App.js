// packages
import React, {Component} from 'react';
import styled from 'styled-components';
import _ from 'lodash';

// components
import Button from './components/Button/Button';
import Input from './components/Input/Input';
import List from './components/List/List';

/**
 * A container component that is used to wrap a todo list
 * where the user can interact by adding, removing or editing tasks
 */
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      /**
       * Contains all the tasks that user adds in todo list
       */
      taskList: [],
      /**
       * Index of the editing task
       */
      editingTaskIndex: -1
    };

    // function bindings
    this.addTaskOnClick = this.addTaskOnClick.bind(this);
    this.addTaskOnEnter = this.addTaskOnEnter.bind(this);
    this.editTask = this.editTask.bind(this);
    this.enableEditMode = this.enableEditMode.bind(this);
    this.disableEditMode = this.disableEditMode.bind(this);
    this.removeTask = this.removeTask.bind(this);
    this.skipEditMode = this.skipEditMode.bind(this);

    // variables
    this.editingTask = '';
  }

  /**
   * Adding task in todo list on event. When add button is clicked the task is added to task list.
   * @param  {object} e click event
   */
  addTaskOnClick() {
    const task = document.getElementById('add-task').value;

    this.addTask(task);
  }

  /**
   * Adding task in todo list on event. When "enter" event is triggered the task is added to task list.
   * @param  {object} e keyboard event
   */
  addTaskOnEnter(e) {
    if (e && e.key === 'Enter') {
      e.preventDefault();
      const task = e.target.value;

      this.addTask(task);
    }
  }

  /**
   * Update state with new task in task list. Input is reseted after task submition, so manual task deletion by user,
   * is not necessary.
   * @param {string} task The task to be added in the list
   */
  addTask(task) {
    this.setState(prevState => ({
      taskList: [...prevState.taskList, task]
    }));

    document.getElementById('task-form').reset();
  }

  /**
   * Editing task
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
   * Delete selected task from task list
   * @param  {string} index index of the task to be removed
   */
  removeTask(index) {
    this.setState(prevState => {
      prevState.taskList.splice(index, 1);
      return {taskList: prevState.taskList};
    });
  }

  /**
   * Submit task
   * @param  {object} e Event
   */
  skipEditMode() {
    this.setState({editingTaskIndex: -1});
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
          <TaskText
            onClick={this.enableEditMode}
            data-index={index}
            value={item}
            rows={1}
          />
        );
      } else {
        // Edit mode
        taskElem = (
          <TaskText
            type='text'
            value={item}
            onChange={this.editTask}
            onKeyPress={this.disableEditMode}
            onBlur={this.skipEditMode}
          />
        );
      }

      return (
        <TaskItem key={`${item}-${index}`}>
          {taskElem}
          <Button
            clickData={item}
            color='rgb(101, 143, 204)'
            onClick={() => this.removeTask(index)}
            text='remove'
            type='submit'
          />
        </TaskItem>
      );
    });

    return (
      <Container>
        <Header>todo</Header>
        <Body>
          <Add id='task-form'>
            <Input
              type='text'
              defaultText='Type what you should do'
              onKeyPress={this.addTaskOnEnter}
              id='add-task'
              width='100%'
            />
          </Add>
          <Button
            onClick={this.addTaskOnClick}
            text='add'
            type='submit'
            color='rgb(101, 143, 204)'
          />
          <TaskList>
            <List items={listItems} />
          </TaskList>
        </Body>
      </Container>
    );
  }
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const Header = styled.div`
  font-size: 70px;
  color: rgb(161, 179, 204);
  font-family: Arial;
  margin-bottom: 5px;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 30%;
`;

const Add = styled.form`
  font-family: Arial;
  margin-bottom: 10px;
  width: 100%;
`;

const TaskList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: 10px;
  width: 100%;
`;

const TaskItem = styled.li`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
`;

const TaskText = styled.input`
  width: 100%;
`;

export default App;
