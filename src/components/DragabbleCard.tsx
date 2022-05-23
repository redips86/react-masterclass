import {Draggable} from "react-beautiful-dnd";
import styled from "styled-components";
import React from "react";

const Card = styled.div`
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 5px 10px;
  background-color: ${props => props.theme.cardColor};
`;

interface IDragabbleCardProps {
    toDo: string;
    index: number;
}

function DragabbleCard({toDo, index}: IDragabbleCardProps) {
    console.log(toDo, " rendered");
    return (
        <Draggable key={toDo} draggableId={toDo} index={index}>
            {(provided) =>
                <Card
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <span>{toDo}</span>
                </Card>
            }
        </Draggable>
    )
}

export default React.memo(DragabbleCard);