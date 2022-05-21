import {useForm} from "react-hook-form";

interface IForm {
    email: string,
    username: string,
    password: string,
    passwordCheck: string,
    extraError?: string;
}

function ToDoList() {
    const {register, handleSubmit, formState: {errors}, setError} = useForm<IForm>({
        defaultValues: {
            email: "@naver.com",
        }
    })
    const onValid = (data: IForm) => {
        if (data.password !== data.passwordCheck) {
            setError("passwordCheck", {message: "비밀번호가 같지 않습니다."}, {shouldFocus: true})
        }
        // setError("extraError", {message: "Server offline..."})
        console.log(data);
    };

    return (
        <div>
            <form style={{display: "flex", flexDirection: "column"}} action="" onSubmit={handleSubmit(onValid)}>
                <input {...register("email", {
                    required: "이메일이 필요합니다.",
                    pattern: {
                        value: /^[A-Za-z0-9._%+-]+@naver.com$/,
                        message: "이메일 양식에 적합하지 않습니다.",
                    }
                })}
                       type="text" placeholder={"email"}/>
                <span> {errors?.email?.message} </span>
                <input {...register("username", {
                    required: "필수값", validate: {
                        noNico: (value) => value.includes("nico") ? "no nicos allowed" : true,
                        noNick: (value) => value.includes("nick") ? "no nicks allowed" : true,
                    }
                })} type="text" placeholder={"username"}/>
                <span> {errors?.username?.message} </span>
                <input {...register("password", {required: "필수값"})} type="text" placeholder={"password"}/>
                <span> {errors?.password?.message} </span>
                <input {...register("passwordCheck", {required: "필수값"})} type="text" placeholder={"passwordCheck"}/>
                <span> {errors?.passwordCheck?.message} </span>
                <button>Add</button>
                <span> {errors?.extraError?.message} </span>
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