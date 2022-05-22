import {useRecoilState, useRecoilValue} from "recoil";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";
import {categoryState, toDoSelector} from "../atoms";


function ToDoList() {
    const toDos = useRecoilValue(toDoSelector);
    const [category, setCateogry] = useRecoilState(categoryState);
    const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
        const {currentTarget: {value}} = event;
        setCateogry(value);
    }

    return (
        <div>
            <h1>To Dos</h1>
            <hr/>
            <select name="todo" id="category" value={category} onInput={onInput}>
                <option value="TO_DO">To Do</option>
                <option value="DOING">Doing</option>
                <option value="DONE">Done</option>
            </select>
            <CreateToDo/>
            {toDos?.map(todo => <ToDo key={todo.id} {...todo}></ToDo>)}
        </div>
    );
}

export default ToDoList;