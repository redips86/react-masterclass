import {useForm} from "react-hook-form";
import {atom, useRecoilState} from "recoil";


interface IForm {
    toDo: string;
}

interface IToDo {
    text: string;
    id: number;
    category: "TO_DO" | "DOING" | "DONE";
}

const toDoState = atom<IToDo[]>({
    key: "toDo",
    default: [],

})

function ToDoList() {
    const [toDos, setToDos] = useRecoilState(toDoState);
    //const value = useRecoilValue(toDoState);
    //const modFn = useSetRecoilState(toDoState);

    const {register, handleSubmit, setValue} = useForm<IForm>();

    const handleValid = ({toDo}: IForm) => {
        setValue("toDo", "");
        setToDos((currVal) => [{id: Date.now(), text: toDo, category: "TO_DO"}, ...currVal]);
    }
    console.log(toDos)

    return (
        <div>
            <h1>To Dos</h1>
            <hr/>
            <form action="src/components/ToDoList" onSubmit={handleSubmit(handleValid)}>
                <input {...register("toDo",
                    {required: "Please write a toDo"}
                )} type="text" placeholder={"Write a to do"}/>
                <button>Add</button>

            </form>
            <ul>
                {toDos.map(todo => <li key={todo.id}>{todo.text}</li>)}
            </ul>
        </div>
    );
}

export default ToDoList;