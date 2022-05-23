import DragabbleCard from "./DragabbleCard";
import {Droppable} from "react-beautiful-dnd";
import styled from "styled-components";

const Wrapper = styled.div`
  min-height: 200px;
  padding: 30px 10px 20px;
  background-color: ${props => props.theme.boardColor};
  border-radius: 5px;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
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
                {(provided) =>
                    <Wrapper ref={provided.innerRef} {...provided.droppableProps}>
                        {toDos.map((toDo, index) => (
                            <DragabbleCard key={toDo} index={index} toDo={toDo}/>
                        ))}
                        {provided.placeholder}
                    </Wrapper>}
            </Droppable>
        </Wrapper>
    );
}

export default Board;