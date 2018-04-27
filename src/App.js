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
       * Todo tasks
       */
      taskList: [],
      /**
       * Index of the task that is about to be updated
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
    this.skipEditMode = this.skipEditMode.bind(this);

    // variables
    this.editingTask = '';
  }

  /**
   * Adding task in task list
   * Task is retrieved from the input text
   * Input is reseted after task submition, so manual task deletion is not necessary
   */
  addTaskOnButtonClick() {
    const task = document.getElementById('add-task').value;
    this.setState({taskList: this.state.taskList.concat([task])});

    document.getElementById('task-form').reset();
  }

  /**
   * Adding task in task list
   * Task is retrieved from the ENTER event
   * Input is reseted after task submition, so manual task deletion is not necessary
   * @param  {object} e keyboard event
   */
  addTaskOnEnter(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.setState({taskList: this.state.taskList.concat(e.target.value)});

      document.getElementById('task-form').reset();
    }
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
            onClick={this.removeTask}
            text='remove'
            type='submit'
            width='65px'
          />
        </TaskItem>
      );
    });

    return (
      <Container>
        <Header>todo</Header>
        <Body>
          <AddWrapper>
            <Add id='task-form'>
              <Input
                type='text'
                defaultText='Type what you should do'
                onKeyPress={this.addTaskOnEnter}
                id='add-task'
                width='300px'
              />
            </Add>
            <Button
              onClick={this.addTaskOnButtonClick}
              text='add'
              type='submit'
              color='rgb(101, 143, 204)'
            />
          </AddWrapper>
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
  font-size: 60px;
  color: rgb(161, 179, 204);
  font-family: Arial;
  margin-bottom: 5px;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const AddWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
`;

const Add = styled.form`
  font-family: Arial;
`;

const TaskList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: 10px;
`;

const Note = styled.div`
  font-size: 20px;
  color: rgb(161, 179, 204);
  font-family: Arial;
`;

const SubNote = styled.div`
  font-size: 10 px;
  color: rgb(161, 179, 204);
  font-family: Arial;
`;

const TaskItem = styled.li`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

const TaskText = styled.input`
  width: 250px;
`;

export default App;
