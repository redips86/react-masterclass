import {useRecoilState, useRecoilValue} from "recoil";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";
import {Categories, categoryState, toDoSelector} from "../atoms";


function ToDoList() {
    const toDos = useRecoilValue(toDoSelector);
    const [category, setCategory] = useRecoilState(categoryState);
    const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
        const {currentTarget: {value}} = event;
        setCategory(value as Categories);
    }

    console.log(toDos)

    return (
        <div>
            <h1>To Dos</h1>
            <hr/>
            <select name="todo" id="category" value={category} onInput={onInput}>
                <option value={Categories.todo}>To Do</option>
                <option value={Categories.doing}>Doing</option>
                <option value={Categories.done}>Done</option>
            </select>
            <CreateToDo/>
            {toDos?.map(todo => <ToDo key={todo.id} {...todo}></ToDo>)}
        </div>
    );
}

export default ToDoList;