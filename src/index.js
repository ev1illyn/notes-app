import React from 'react';
import ReactDOM from 'react-dom';
import '@atlaskit/css-reset';
import styled from 'styled-components';
import initialData from './initial-data';
import Column from "./column";
import { DragDropContext } from "react-beautiful-dnd";
import AddTask from './add-task';

const Container = styled.div`
  display: flex;
`;

const Cont = styled.div`
`;

const Header = styled.div`
  width:100vw;
  height:40px;
  background-color:black;
  opacity: 0.1;
  font-family: 'Itim', cursive;
  color:white;
  font-size:30px;
  text-align:center;
`;

const Status = styled.div`
  margin: 10px auto;
  padding: 8px;
  border: 1px solid lightgrey;
  border-radius: 5px;
  width: 220px;
  display: flex;
  flex-direction: column;
  font-family: 'Itim', cursive;
  background-color:rgb(240, 240, 240);
`;

const Footer = styled.h3`
  margin: 10px auto;
  padding: 8px;
  border: 1px solid lightgrey;
  border-radius: 5px;
  width: 220px;
  display: flex;
  flex-direction: column;
  font-family: 'Itim', cursive;
  background-color:rgb(240, 240, 240);
`;

class App extends React.Component {

  state = initialData;
  position = 'You did not lifted any task.';

  onDragStart = (start, provided) => {
    provided.announce(
      `You have lifted the task in position: ${start.source.index + 1}.`,
    );
    this.position = `You are lifting the task in ${start.source.index + 1} position ${start.source.index + 1}`;
    const homeIndex = this.state.columnOrder.indexOf(start.source.droppableId);

    this.setState({
      homeIndex,
    });
  };

  onDragUpdate = (update, provided) => {
    const message = update.destination
      ? `You have moved the task to ${update.destination.droppableId}, position ${update.destination.index + 1}.`
      : `You are currently not over a droppable area`;
    this.position = message;
    provided.announce(message);
  }

  onDragEnd = (result, provided) => {

    const message = result.destination
      ? `You have moved the task from ${result.source.droppableId}, position ${result.source.index + 1} to ${result.destination.droppableId}, position ${result.destination.index + 1}.`
      : `The task has been returned to its starting position of.`;

    this.position = message;
    provided.announce(message);

    this.setState({
      homeIndex: null,
    });

    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (destination.droppableId === source.droppableId &&
      destination.index === source.index) return;

    const start = this.state.columns[source.droppableId];
    const finish = this.state.columns[destination.droppableId];

    if (start === finish) {

      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn,
        },
      };

      this.setState(newState);
      return;

    }

    // move task to another list

    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);

    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);

    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    this.setState(newState);

  };

  addTask = (task) => {

    let taskNumber = (Object.keys(this.state.tasks).length);
    let taskName = 'task-' + (taskNumber + 1);

    const newTasksIds = Array.from(this.state.columns['column-1'].taskIds);
    newTasksIds.push(taskName);

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        'column-1': {
          ...this.state.columns['column-1'],
          taskIds: newTasksIds,
        },
      },
      tasks: {
        ...this.state.tasks,
        [taskName]: {
          id: taskName,
          content: task
        },
      },
    };

    this.setState(newState);
  }

  render() {


    return (

      <Cont>

        <Header>NOTES APP</Header>
        <Status>{this.position}</Status>

        <DragDropContext onBeforeDragStart={this.onBeforeDragStart}
          onDragStart={this.onDragStart}
          onDragUpdate={this.onDragUpdate}
          onDragEnd={this.onDragEnd}
        >

          <Container>
            {this.state.columnOrder.map((columnId, index) => {

              let column = this.state.columns[columnId];

              let tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);

              let isDropDisabled = index < this.state.homeIndex;

              return <Column key={column.id} column={column} tasks={tasks}
                taskList={this.state}
                isDropDisabled={isDropDisabled} />;

            })}
          </Container>

        </DragDropContext>

        <Footer>
          <AddTask addTask={this.addTask}></AddTask>
        </Footer>

      </Cont>

    );

  }
}

ReactDOM.render(<App />, document.getElementById('root'));