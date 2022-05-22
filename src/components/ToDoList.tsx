import {useRecoilValue} from "recoil";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";
import {toDoState} from "../atoms";


function ToDoList() {
    const toDos = useRecoilValue(toDoState);

    return (
        <div>
            <h1>To Dos</h1>
            <hr/>
            <CreateToDo/>
            <ul>
                {toDos.map(todo => <ToDo key={todo.id} {...todo} />)}
            </ul>
        </div>
    );
}

export default ToDoList;