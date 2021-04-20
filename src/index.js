import React from 'react';
import ReactDOM from 'react-dom';
import '@atlaskit/css-reset';
import styled from 'styled-components';
import initialData from './initial-data';
import Column from "./column";
import { DragDropContext } from "react-beautiful-dnd";

const Container = styled.div`
  display: flex;
`;
const Cont = styled.div`
`;
const Msg = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  min-width: 220px;
  font-family: 'Itim', cursive;
`;

class App extends React.Component {

  state = initialData;
  position = 'Você não moveu nenhuma nota.';

  onDragStart = (start, provided) => {
    provided.announce(
      `Você moveu a tarefa de posição: ${start.source.index + 1}.`,
    );
    this.position = `Você está movendo a tarefa de posição: ${start.source.index + 1}`;
    const homeIndex = this.state.columnOrder.indexOf(start.source.droppableId);

    this.setState({
      homeIndex,
    });
  };

  onDragUpdate = (update, provided) => {
    const message = update.destination
      ? `Você moveu a tarefa para a posição ${update.destination.index + 1}.`
      : `Essa não é uma área para mover a tarefa.`;
    this.position = message;
    provided.announce(message);
  }

  onDragEnd = (result, provided) => {

    const message = result.destination
      ? `Você moveu a tarefa de posição ${result.source.index + 1} para a posição ${result.destination.index + 1}.`
      : `A tarefa foi movida para sua posição inicial.`;

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

  render() {
    return (

      <Cont>
        <Msg>{this.position}</Msg>
        <DragDropContext onBeforeDragStart={this.onBeforeDragStart}
          onDragStart={this.onDragStart}
          onDragUpdate={this.onDragUpdate}
          onDragEnd={this.onDragEnd}
        >
          <Container>
            {this.state.columnOrder.map((columnId, index) => {

              const column = this.state.columns[columnId];
              const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);

              const isDropDisabled = index < this.state.homeIndex;

              return <Column key={column.id} column={column} tasks={tasks} isDropDisabled={isDropDisabled} />;

            })}
          </Container>
        </DragDropContext>
      </Cont>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));