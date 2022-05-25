import {useQuery} from "react-query";
import {getMovies, IGetMoviesResult} from "../api";
import styled from "styled-components";
import {makeImagePath} from "../utils";
import {AnimatePresence, motion, MotionValue, useViewportScroll} from "framer-motion";
import {useState} from "react";
import {useMatch, useNavigate} from "react-router-dom";

const Wrapper = styled.div`
  background: black;
  padding-bottom: 200px;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgphoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${props => props.bgphoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px;
`;

const Overview = styled.p`
  font-size: 36px;
  width: 50%
`;

const Slider = styled.div`
  position: relative;
  top: -100px
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
`;

const Box = styled(motion.div)<{ bgphoto: string; }>`
  background-color: white;
  background-image: url(${props => props.bgphoto});
  background-size: cover;
  background-position: center;
  height: 200px;
  font-size: 66px;
  cursor: pointer;

  &:first-child {
    transform-origin: center left;
  }

  &:last-child {
    transform-origin: center right;
  }
`;

const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${props => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;

  h4 {
    text-align: center;
    font-size: 18px;
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;

`;

const BigMovie = styled(motion.div)<{ scroll: MotionValue<number> }>`
  position: absolute;
  width: 40vw;
  height: 60vh;
  top: ${prop => prop.scroll.get() + 50}px;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 50px;
  overflow: hidden;
  background-color: ${props => props.theme.black.lighter};
`

const BigCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
`;

const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  font-size: 46px;
  position: relative;
  top: -80px;
`;

const BigOverview = styled.p`
  padding: 20px;
  position: relative;
  top: -80px;
  color: ${(props) => props.theme.white.lighter};
`;

const rowVariants = {
    hidden: {
        x: window.outerWidth,
    },
    visible: {
        x: 0,
    },
    exit: {
        x: -window.outerWidth,
    }
}

const boxVariants = {
    normal: {
        scale: 1,
        transition: {
            type: "tween"
        }
    },
    hover: {
        scale: 1.3,
        y: -50,
        transition: {
            type: "tween",
            duration: 0.3,
            delay: 0.5
        }
    }
}

const infoVariants = {
    hover: {
        opacity: 1,
        transition: {
            type: "tween",
            duration: 0.3,
            delay: 0.5
        }
    }
}

const offset = 6;

function Home() {

    const navigate = useNavigate();
    const bigMovieMatch = useMatch("/movies/:movieId");
    const {scrollY} = useViewportScroll();
    // const setScrollY = useTransform(scrollY, (value) => value + 50);

    const {data, isLoading} = useQuery<IGetMoviesResult>(["movies", "nowPlaying"], getMovies);
    const [index, setIndex] = useState(0);
    const increaseIndex = () => {
        if (data) {
            if (leaving) {
                return;
            }
            toggleLeaving();

            const totalMovies = data.results.length - 1;
            const maxIndex = Math.floor(totalMovies / offset) - 1;
            setIndex(prev => prev === maxIndex ? 0 : prev + 1);
        }
    }
    const [leaving, setLeaving] = useState(false);
    const toggleLeaving = () => setLeaving(prev => !prev);
    const onBoxClicked = (movieId: number) => {
        navigate(`/movies/${movieId}`)
    }
    const onOverlayClick = () => {
        navigate('/');
    }
    const clickedMovie = bigMovieMatch?.params.movieId && data?.results.find(movie => String(movie.id) === bigMovieMatch.params.movieId);

    return (
        <Wrapper style={{height: "200vh"}}>
            {isLoading ? <Loader></Loader> : <>
                <Banner
                    onClick={increaseIndex}
                    bgphoto={makeImagePath(data?.results[0].backdrop_path || "")}>
                    <Title>{data?.results[0].title}</Title>
                    <Overview>{data?.results[0].overview}</Overview>
                </Banner>
                <Slider>
                    <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
                        <Row
                            variants={rowVariants}
                            initial={"hidden"}
                            animate={"visible"}
                            exit={"exit"}
                            transition={{type: "tween", duration: 1}}
                            key={index}>
                            {
                                data?.results
                                    .slice(1)
                                    .slice(offset * index, offset * index + offset)
                                    .map(movie =>
                                        <Box
                                            layoutId={movie.id + ""}
                                            onClick={() => onBoxClicked(movie.id)}
                                            variants={boxVariants}
                                            initial={"normal"}
                                            key={movie.id}
                                            whileHover={"hover"}
                                            bgphoto={makeImagePath(movie.backdrop_path, "w500")}
                                        >

                                            <Info variants={infoVariants}>
                                                <h4>{movie.title}</h4>
                                            </Info>
                                        </Box>)
                            }
                        </Row>
                    </AnimatePresence>
                </Slider>
                <AnimatePresence>
                    {
                        bigMovieMatch ?
                            <>
                                <Overlay
                                    onClick={onOverlayClick}
                                    animate={{opacity: 1}}
                                    exit={{opacity: 0}}
                                ></Overlay>
                                <BigMovie
                                    layoutId={bigMovieMatch.params.movieId}
                                    scroll={scrollY}
                                >
                                    {clickedMovie && <>
                                        <BigCover
                                            style={{
                                                backgroundImage: `linear-gradient(to top, black, transparent),
                                                url(${makeImagePath(clickedMovie.backdrop_path, "w500")})`
                                            }}
                                        />
                                        <BigTitle>{clickedMovie.title}</BigTitle>
                                        <BigOverview>{clickedMovie.overview}</BigOverview>
                                    </>}
                                </BigMovie>
                            </>
                            : null

                    }
                </AnimatePresence>
            </>}
        </Wrapper>);
}

export default Home;
