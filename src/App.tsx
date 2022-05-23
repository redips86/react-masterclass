import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";

function App() {
    const onDragEnd = () => {
    };
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div>
                <Droppable droppableId={"droppable"}>
                    {(provied) => <ul ref={provied.innerRef} {...provied.droppableProps}>
                        <Draggable draggableId={"first"} index={0}>
                            {(provided) =>
                                <li
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                >
                                    <span {...provided.dragHandleProps}>🥳</span>
                                    One
                                </li>
                            }
                        </Draggable>
                    </ul>}
                </Droppable>
            </div>
        </DragDropContext>
    );
}

export default App;