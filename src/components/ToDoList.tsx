import {useRecoilValue} from "recoil";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";
import {toDoSelector} from "../atoms";


function ToDoList() {
    const [toDos, doing, done] = useRecoilValue(toDoSelector);

    return (
        <div>
            <h1>To Dos</h1>
            <hr/>
            <CreateToDo/>
            <h2>To Do</h2>
            <hr/>
            <ul>
                {toDos.map(todo => <ToDo key={todo.id} {...todo} />)}
            </ul>
            <h2>Doing</h2>
            <hr/>
            <ul>
                {doing.map(todo => <ToDo key={todo.id} {...todo} />)}
            </ul>
            <h2>Done</h2>
            <hr/>
            <ul>
                {done.map(todo => <ToDo key={todo.id} {...todo} />)}
            </ul>
        </div>
    );
}

export default ToDoList;