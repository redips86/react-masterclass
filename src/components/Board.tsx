import DragabbleCard from "./DragabbleCard";
import {Droppable} from "react-beautiful-dnd";
import styled from "styled-components";
import {useForm} from "react-hook-form";
import {ITodo, toDoState} from "../atoms";
import {useSetRecoilState} from "recoil";

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
  background-color: ${props => props.isDraggingOver ? "#dfe6e9" : props.isDraggingFromThis
          ? "#b2bec3" : "transparent"};
  flex-grow: 1;
  transition: background-color .3s ease-in-out;
  padding: 20px;
`;

const Form = styled.form`
  width: 100%;
`;

interface IBoardProps {
    toDos: ITodo[];
    boardId: string;
}

interface IForm {
    toDo: string;
}

function Board({toDos, boardId}: IBoardProps) {
    const setToDos = useSetRecoilState(toDoState);
    const {register, setValue, handleSubmit} = useForm<IForm>();
    const onValid = ({toDo}: IForm) => {
        const newToDo = {
            id: Date.now(),
            text: toDo,
        }
        setToDos(currVal => {
            console.log(currVal);
            return {
                ...currVal,
                [boardId]: [newToDo, ...currVal[boardId]]
            }
        });
        setValue("toDo", "");
    };

    return (
        <Wrapper>
            <Title>{boardId}</Title>
            <Form onSubmit={handleSubmit(onValid)}>
                <input {...register("toDo", {required: true})} type="text" placeholder={`Add task on ${boardId}`}/>
            </Form>

            <Droppable droppableId={boardId}>
                {(provided, snapshot) => (
                    <Area
                        isDraggingOver={snapshot.isDraggingOver}
                        isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {toDos.map((toDo, index) => (
                            <DragabbleCard
                                key={toDo.id}
                                index={index}
                                toDoId={toDo.id}
                                toDoText={toDo.text}/>
                        ))}
                        {provided.placeholder}
                    </Area>
                )}
            </Droppable>
        </Wrapper>
    );
}

export default Board;