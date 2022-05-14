import React, {useState} from "react";

function App() {
    const [value, setValue] = useState("");
    const onChange = (event: React.FormEvent<HTMLInputElement>) => {
        const {currentTarget: {value}} = event;
        setValue(value);
    };

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("hello", value);
    };

    return (
        <div>
            <form action="" onSubmit={onSubmit}>
                <input type="text" placeholder={"username"} onChange={onChange} value={value}/>
                <button>Log In</button>
            </form>
        </div>
    );
}

export default App;