import * as React from 'react'
import styled from 'styled-components';
import Task from './task';
import { Droppable } from "react-beautiful-dnd";
import './index.css';

const Container = styled.div`
    margin: 8px;
    border: 1px solid lightgrey;
    border-radius: 5px;
    width: 220px;
    display: flex;
    flex-direction: column;
    font-family: 'Itim', cursive;
    background-color: #d4d4d4;
`;

const Title = styled.h3`
    padding: 8px;
    color: #79888b;
`;

const TaskList = styled.div`
    padding: 8px;
    color: fff;
    background-color: ${props => (props.isDraggingOver ? '#c7c7c7' : '#d4d4d4')};
    flex-grow: 1;
`;



export default class Column extends React.Component {
    render() {
        return (
            <Container>

                <Title>{this.props.column.title}</Title>

                <Droppable
                    droppableId={this.props.column.id}
                    isDropDisabled={this.props.isDropDisabled}
                >
                    {(provided, snapshot) => (
                        <TaskList ref={provided.innerRef} {...provided.droppableProps}
                            isDraggingOver={snapshot.isDraggingOver}>

                            {this.props.tasks.map((task, index) => (
                                <Task key={task.id} task={task} index={index} />
                            ))}
                            {provided.placeholder}
                        </TaskList>
                    )}
                </Droppable>

            </Container>
        );
    }
}