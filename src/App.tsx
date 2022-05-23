import {DragDropContext, Droppable, DropResult} from "react-beautiful-dnd";
import styled from "styled-components";
import {useRecoilState} from "recoil";
import {toDoState} from "./atoms";
import DragabbleCard from "./components/DragabbleCard";

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
  grid-template-columns: repeat(1, 1fr);
`;

const Board = styled.div`
  min-height: 200px;
  padding: 30px 10px 20px;
  background-color: ${props => props.theme.boardColor};
  border-radius: 5px;
`;





function App() {
    const [toDos, setToDos] = useRecoilState(toDoState);

    const onDragEnd = ({draggableId, destination, source}: DropResult) => {
        if (!destination) return;
        setToDos(currVal => {
            const toDosCopy = [...currVal];
            // 1) Delete item on source.index
            console.log("Delete item on", source.index);
            console.log(toDosCopy);

            toDosCopy.splice(source.index, 1);

            console.log("Delete item");
            console.log(toDosCopy);

            // 2) Put back the item on the destination.index
            console.log("Put back", draggableId, "on", destination.index)
            toDosCopy.splice(destination?.index as number, 0, draggableId);
            console.log(toDosCopy)
            return toDosCopy;
        })
    };
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Wrapper>
                <Boards>
                    <Droppable droppableId={"droppable"}>
                        {(provided) =>
                            <Board ref={provided.innerRef} {...provided.droppableProps}>
                                {toDos.map((toDo, index) => (
                                    <DragabbleCard key={toDo} index={index} toDo={toDo}/>
                                ))}
                                {provided.placeholder}
                            </Board>}
                    </Droppable>
                </Boards>
            </Wrapper>
        </DragDropContext>
    );
}

export default App;