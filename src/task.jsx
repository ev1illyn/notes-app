import React from 'react';
import styled from 'styled-components';
import { Draggable } from "react-beautiful-dnd";

const Container = styled.div`
    border: 1px solid lightgrey;
    border-radius: 5px;
    padding: 8px;
    margin-bottom: 8px;
    background-color: ${props =>
        props.isDragDisabled
            ? 'lightgrey'
            : props.isDragging
                ? 'LightSalmon' : 'Salmon'};
    display: flex;
    background: white;
    position: relative;
    display: flex;
    justify-content: left;
    box-shadow: 3px 3px 2px var(--paper-shadow);
    transform-origin: top left;

`;

const Handle = styled.div`
    width: 20px;
    height: 20px;
    background-color: #c7c7c7;
    border-radius: 4px;
    margin-right: 8px;
`;

export default class Task extends React.Component {
    render() {

        const isDragDisabled = this.props.task.id === 'task-5';

        return (

            <Draggable draggableId={this.props.task.id} index={this.props.index} isDragDisabled={isDragDisabled}>

                {(provided, snapshot) => (
                    <Container
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                        isDragging={snapshot.isDragging}
                        aria-roledescription="Pressione a barra de espaço para mover a tarefa."
                    >
                        <Handle {...provided.dragHandleProps} />
                        {this.props.task.content}
                    </Container>
                )
                }

            </Draggable>

        );
    }
}