import Circle from "./Circle";

function App() {
    return (
        <div>
            <Circle bgColor="teal" borderColor={"yellow"}></Circle>
            <Circle bgColor="tomato" text={"override text"}></Circle>
        </div>
    );
}

export default App;