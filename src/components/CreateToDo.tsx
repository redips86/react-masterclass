import {useForm} from "react-hook-form";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {categoryState, IToDo, toDoState} from "../atoms";


interface IForm {
    toDo: string;
}

function CreateToDo() {
    const {register, handleSubmit, setValue} = useForm<IForm>();

    const setToDos = useSetRecoilState(toDoState);
    const category = useRecoilValue<IToDo["category"]>(categoryState);
    const handleValid = ({toDo}: IForm) => {
        setValue("toDo", "");

        setToDos((currVal) => [{id: Date.now(), text: toDo, category: category}, ...currVal]);
    }

    return (
        <form action="src/components/ToDoList" onSubmit={handleSubmit(handleValid)}>
            <input {...register("toDo",
                {required: "Please write a toDo"}
            )} type="text" placeholder={"Write a to do"}/>
            <button>Add</button>

        </form>
    );
}

export default CreateToDo;