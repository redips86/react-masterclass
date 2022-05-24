import styled from "styled-components";
import {motion} from "framer-motion";
import {useRef} from "react";

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BiggerBox = styled.div`
  width: 600px;
  height: 600px;
  backgroud-color: rgba(255, 255, 255, 0.4);
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;


const boxVariants = {
    hover: {scale: 1.5, rotateZ: 90},
    click: {scale: 1.0, borderRadius: "180px"},
    drag: {
        backgroundColor: "rgb(46, 204,113)",
        transition: {
            duration: 10
        }
    }
}


function App() {
    const biggerBoxRef = useRef<HTMLDivElement>(null);
    return (
        <Wrapper>
            <BiggerBox ref={biggerBoxRef}>
                <Box
                    drag
                    dragSnapToOrigin
                    dragElastic={0.5}
                    dragConstraints={biggerBoxRef}
                    variants={boxVariants}
                    whileDrag={"drag"}
                    whileHover={"hover"}
                    whileTap={"click"}/>
            </BiggerBox>
        </Wrapper>
    );
}

export default App;