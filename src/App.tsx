import React from "react";
import styled from "styled-components";

interface DummyProps {
    text: string;
    otherThingHere?: string;
}

function Dummy({text, otherThingHere = 'TTT'}: DummyProps) {
    const H1 = styled.h1`
      color: ${props => props.theme.textColor}
    `;

    return (
        <>
            <H1>{text}</H1>
            <H1>{otherThingHere}</H1>
        </>
    );
}

function App() {
    const Container = styled.div`
      background-color: ${props => props.theme.bgColor}
    `;

    const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        alert(event.currentTarget.value);
    };

    return (
        <div>
            <Container>
                <Dummy text={"redips study"}></Dummy>
                <button onClick={onClick} value={"tt"}>Click me</button>
            </Container>
        </div>
    );
}

export default App;