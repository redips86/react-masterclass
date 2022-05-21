import {useForm} from "react-hook-form";

function ToDoList() {
    const {register, handleSubmit, formState} = useForm()
    const onValid = (data: any) => {
        console.log(data);
    };
    console.log(formState.errors);

    return (
        <div>
            <form style={{display: "flex", flexDirection: "column"}} action="" onSubmit={handleSubmit(onValid)}>
                <input {...register("email", {required: "이메일이 필요합니다.", minLength: {value: 5, message: "너무 짧습니다."}})}
                       type="text" placeholder={"email"}/>
                <input {...register("username", {required: true})} type="text" placeholder={"username"}/>
                <input {...register("password", {required: true})} type="text" placeholder={"password"}/>
                <input {...register("passwordCheck", {required: true})} type="text" placeholder={"passwordCheck"}/>
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