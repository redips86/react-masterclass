import DragabbleCard from "./DragabbleCard";
import {Droppable} from "react-beautiful-dnd";
import styled from "styled-components";

const Wrapper = styled.div`
  min-height: 200px;
  padding: 30px 10px 20px;
  background-color: ${props => props.theme.boardColor};
  border-radius: 5px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;

interface IAreaProps {
    isDraggingOver: boolean;
    isDraggingFromThis: boolean;
}

const Area = styled.div<IAreaProps>`
  background-color: ${props => props.isDraggingOver ? "pink" : props.isDraggingFromThis ? "red" : "blue"};
  flex-grow: 1;
  transition: background-color .3s ease-in-out;
`;

interface IBoardProps {
    toDos: string[];
    boardId: string;
}


function Board({toDos, boardId}: IBoardProps) {
    return (
        <Wrapper>
            <Title>{boardId}</Title>
            <Droppable droppableId={boardId}>
                {(provided, snapshot) =>
                    <Area isDraggingOver={snapshot.isDraggingOver}
                          isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
                          ref={provided.innerRef}
                          {...provided.droppableProps}>
                        {toDos.map((toDo, index) => (
                            <DragabbleCard key={toDo} index={index} toDo={toDo}/>
                        ))}
                        {provided.placeholder}
                    </Area>}
            </Droppable>
        </Wrapper>
    );
}

export default Board;