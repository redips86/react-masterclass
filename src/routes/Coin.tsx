import {useLocation, useParams} from "react-router-dom";
import styled from "styled-components";
import {useState} from "react";

const Loader = styled.span`
  text-align: center;
`;

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  color: ${props => props.theme.accentColor}
`;

interface RouteParams {
    coinId: string;
}


interface LocationParams {
    state: {
        name: string;
    }
}

function Coin() {
    const {coinId} = useParams<keyof RouteParams>() as RouteParams;
    const [loading, setLoading] = useState(true);
    const {state} = useLocation() as LocationParams;
    console.log(state);

    return (
        <Container>
            <Header>
                <Title>{state?.name || "Loading"}</Title>
            </Header>
            {loading ? <Loader>Loading...</Loader> : <h2>Coin : {coinId} </h2>}
        </Container>
    );
};

export default Coin;