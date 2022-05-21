import {useForm} from "react-hook-form";

function ToDoList() {
    const {register, watch} = useForm();
    console.log(watch())
    return (
        <div>
            <form action="">
                <input {...register("toDo")} type="text" placeholder={"Write a to do"}/>
                <button>Add</button>
            </form>
        </div>
    );
}

/*
function ToDoList() {
    useForm()
    const [toDo, setToDo] = useState("");
    const [toDoError, setToDoError] = useState("");
    const onChange = (event: React.FormEvent<HTMLInputElement>) => {
        const {currentTarget: {value}} = event;
        setToDoError("");
        setToDo(value);
    };

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(toDo.length < 10)
            return setToDoError("To do should be longed");
        console.log(toDo);
    }

    return (
        <div>
            <form action="" onSubmit={onSubmit}>
                <input onChange={onChange} value={toDo} type="text" placeholder={"Write a to do"}/>
                <button>Add</button>
                {toDoError !== "" ? toDoError : null }
            </form>
        </div>
    );
}
*/

export default ToDoList;