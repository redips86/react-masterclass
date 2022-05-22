import {IToDo, toDoState} from "../atoms";
import {useSetRecoilState} from "recoil";

function ToDo({text, category, id}: IToDo) {
    const setToDos = useSetRecoilState(toDoState);

    const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const {currentTarget: {name}} = event;

        console.log("i wanna to ", name);
    };
    return (
        <li>
            {text}
            {category !== 'DOING' && <button name={"DOING"} onClick={onClick}>Doing</button>}
            {category !== 'TO_DO' && <button name={"TO_DO"} onClick={onClick}>To Do</button>}
            {category !== 'DONE' && <button name={"DONE"} onClick={onClick}>Done</button>}
        </li>
    );
}

export default ToDo;