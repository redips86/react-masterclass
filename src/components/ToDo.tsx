import {IToDo, toDoState} from "../atoms";
import {useSetRecoilState} from "recoil";

/*
* [
    {
        "id": 1653202072156,
        "text": "5",
        "category": "TO_DO"
    },
    {
        "id": 1653202071847,
        "text": "4",
        "category": "TO_DO"
    },
    {
        "id": 1653202071656,
        "text": "3",
        "category": "TO_DO"
    },
    {
        "id": 1653202071470,
        "text": "2",
        "category": "TO_DO"
    },
    {
        "id": 1653202071289,
        "text": "1",
        "category": "TO_DO"
    },
    {
        "id": 1653201776281,
        "text": "45",
        "category": "TO_DO"
    }
]
* */

function ToDo({text, category, id}: IToDo) {
    const setToDos = useSetRecoilState(toDoState);

    const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const {currentTarget: {name}} = event;

        setToDos(currVal => {
            const targetIndex = currVal.findIndex(toDo => toDo.id === id);
            const oldToDo = currVal[targetIndex];
            const newToDo = {id, text, category: name as any};

            console.log(oldToDo);
            console.log(newToDo);
            return [...currVal.slice(0, targetIndex), newToDo, ...currVal.slice(targetIndex + 1)]
        })
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