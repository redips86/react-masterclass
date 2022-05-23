import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
`;

const Board = styled.div`
  min-height: 200px;
  padding: 30px 10px 20px;
  background-color: ${props => props.theme.boardColor};
  border-radius: 5px;
`;

const Card = styled.div`
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 5px 10px;
  background-color: ${props => props.theme.cardColor};
`;

const toDos = ["a", "b", "c", "d", "e", "f"];


function App() {
    const onDragEnd = () => {
    };
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Wrapper>
                <Boards>
                    <Droppable droppableId={"droppable"}>
                        {(provied) =>
                            <Board ref={provied.innerRef} {...provied.droppableProps}>
                                {toDos.map((toDo, index) => (
                                    <Draggable draggableId={toDo} index={index}>
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
                                ))}
                                {provied.placeholder}
                            </Board>}
                    </Droppable>
                </Boards>
            </Wrapper>
        </DragDropContext>
    );
}

export default App;