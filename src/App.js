import styled, {keyframes} from 'styled-components';

const Wrapper = styled.div`
  display: flex;
`;

const animation = keyframes`
  0% {
    transform: rotate(0deg);
    border-radius: 0;
  }
  50% {
    transform: rotate(360deg);
    border-radius: 100px;
  }
  100% {
    transform: rotate(0deg);
    border-radius: 0;
  }
`;

const Box = styled.div`
  height: 200px;
  width: 200px;
  background-color: tomato;
  animation: ${animation} 1s linear infinite;
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    font-size: 36px;
    // span:hover 랑 동일
    &:hover {
      font-size: 80px;
    }
    // span:active 랑 동일
    &:active{
      opacity: 0;
    }
  }
`;

function App() {
    return (
        <Wrapper>
            <Box>
                <span>😘</span>
            </Box>
        </Wrapper>
    );
}

export default App;
