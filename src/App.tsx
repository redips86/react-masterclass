import {useRecoilState, useRecoilValue} from "recoil";
import {hourSelector, minuteState} from "./atoms";

function App() {

    const [minutes, setMinutes] = useRecoilState(minuteState);
    const hours = useRecoilValue(hourSelector)

    const onMinutesChange = (event: React.FormEvent<HTMLInputElement>) => {
        setMinutes(+event.currentTarget.value);
    }


    return (
        <div>
            <input type="number" onChange={onMinutesChange} placeholder={"minute"} value={minutes}/>
            <input type="number" placeholder={"Hours"} value={hours}/>
        </div>
    );
}

export default App;