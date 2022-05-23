import {Draggable} from "react-beautiful-dnd";
import styled from "styled-components";
import React from "react";

const Card = styled.div<{ isDragging: boolean }>`
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 5px 10px;
  background-color: ${props => props.isDragging ? "#74b9ff" : props.theme.cardColor};
  box-shadow: ${props => props.isDragging ? "0px 2px 25px rgba(0,0,0,0.05)" : "none"};
`;

interface IDragabbleCardProps {
    toDoId: number;
    toDoText: string;
    index: number;
}

function DragabbleCard({toDoId, toDoText, index}: IDragabbleCardProps) {

    return (
        <Draggable key={toDoId} draggableId={toDoId + ""} index={index}>
            {(provided, snapshot) =>
                <Card
                    isDragging={snapshot.isDragging}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <span>{toDoText}</span>
                </Card>
            }
        </Draggable>
    )
}

export default React.memo(DragabbleCard);