import React from "react";
//Styling and Animation
import styled from "styled-components";
import { motion } from "framer-motion";
//Redux
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
//Image resize helper
import { smallImage } from "../util";
// IMAGES
import playstation from "../img/playstation.svg";
import steam from "../img/steam.svg";
import xbox from "../img/xbox.svg";
import nintendo from "../img/nintendo.svg";
import apple from "../img/apple.svg";
import gamepad from "../img/gamepad.svg";
//Star Images
import starEmpty from "../img/star-empty.png";
import starFull from "../img/star-full.png";

function GameDetail({ pathId }) {
  const history = useHistory();
  //Exit Detail
  const exitDetailHander = (e) => {
    const element = e.target;
    if (element.classList.contains("shadow")) {
      document.body.style.overflow = "auto";
      history.push("/");
    }
  };
  //Data
  const { screen, game, isLoading } = useSelector((state) => state.detail);

  //Get Platform Images
  const getPlatform = (platform) => {
    switch (platform) {
      case "PlayStation 4":
        return playstation;
      case "PlayStation 5":
        return playstation;
      case "PlayStation 3":
        return playstation;
      case "Xbox Series S/X":
        return xbox;
      case "Xbox S":
        return xbox;
      case "Xbox One":
        return xbox;
      case "Xbox 360":
        return xbox;
      case "PC":
        return steam;
      case "Nintendo Switch":
        return nintendo;
      case "iOS":
        return apple;
      default:
        return gamepad;
    }
  };

  //Get Stars
  const getStars = () => {
    const stars = [];
    const rating = Math.floor(game.rating);
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<img alt="star" key={i} src={starFull}></img>);
      } else {
        stars.push(<img alt="star" key={i} src={starEmpty}></img>);
      }
    }
    return stars;
  };

  return (
    <>
      {!isLoading && (
        <CardShadow className="shadow" onClick={exitDetailHander}>
          <Detail layoutId={`image ${pathId}`}>
            <CardTop>
              <Media>
                <motion.img
                  className="card-top-background-image"
                  src={smallImage(game.background_image, 1920)}
                  alt={game.background_image}
                  // layoutId={`image ${pathId}`}
                />
                {game.clip && (
                  <video controls autoPlay loop>
                    <source src={game.clip.clips.full} />
                  </video>
                )}
                <div className="vote">
                  {game.ratings.map((rating) => (
                    <div className="vote-container" key={rating.title}>
                      <p className="vote-title">{rating.title}</p>
                      <div
                        className="vote-count-bar"
                        style={{
                          width: `${rating.count}px`,
                          // background: `#${game.dominant_color}`,
                        }}
                      ></div>
                    </div>
                  ))}
                </div>
              </Media>
              <Stats>
                <div className="rating">
                  <motion.h3 className="game-name" layoutId={`title ${pathId}`}>
                    {game.name}
                  </motion.h3>
                  {game.publishers.map((publisher) => (
                    <p className="publisher-name" key={publisher.name}>
                      {publisher.name}
                    </p>
                  ))}
                  <motion.div className="rating-container">
                    <div className="star-container">
                      {getStars()}
                      <p>({game.rating})</p>
                    </div>
                    <a
                      href={game.metacritic_url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {game.metacritic_url}
                    </a>
                    <a href={game.website} target="_blank" rel="noreferrer">
                      {game.website}
                    </a>
                    {game.genres.map((genre, i) => (
                      <p key={i} className="genre">
                        {genre.name}
                      </p>
                    ))}
                  </motion.div>
                </div>
                <Info>
                  <h3>Platforms</h3>
                  <Platforms>
                    {game.platforms.map((data) => (
                      <img
                        src={getPlatform(data.platform.name)}
                        key={data.platform.id}
                        title={data.platform.name}
                        alt={data.platform.name}
                      ></img>
                    ))}
                  </Platforms>
                </Info>
                <MetacriticScore>
                  {game.metacritic !== null ? (
                    <motion.div
                      className="metacritic-score"
                      LayoutId={`metacritic-score ${pathId}`}
                    >
                      <p>{game.metacritic}</p>
                    </motion.div>
                  ) : (
                    <div className="not-available metacritic-score">
                      <p>N/A</p>
                    </div>
                  )}
                </MetacriticScore>
              </Stats>
            </CardTop>
            {/* <Stats>
              <div className="rating">
                <motion.h3 layoutId={`title ${pathId}`}>{game.name}</motion.h3>
                <p>Rating: {game.rating}</p>
                {getStars()}
              </div>
              <Info>
                <h3>Platforms</h3>
                <Platforms>
                  {game.platforms.map((data) => (
                    <img
                      title={data.platform.name}
                      src={getPlatform(data.platform.name)}
                      alt="platform"
                      key={data.platform.id}
                    ></img>
                  ))}
                </Platforms>
              </Info>
            </Stats>
            <Media>
              <motion.img
                layoutId={`image ${pathId}`}
                src={smallImage(game.background_image, 1280)}
                alt="img"
              />
            </Media> */}
            <Description>
              <p>{game.description_raw}</p>
            </Description>
            <Gallery>
              {screen.results.map((screen) => (
                <img
                  src={smallImage(screen.image, 1280)}
                  key={screen.id}
                  alt="game"
                />
              ))}
            </Gallery>
          </Detail>
        </CardShadow>
      )}
    </>
  );
}
const CardShadow = styled(motion.div)`
  width: 100%;
  min-height: 100vh;
  overflow-y: scroll;
  background: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;
  &::-webkit-scrollbar {
    width: 0.5rem;
  }
  &::-webkit-scrollbar-thumb {
    background-color: black;
  }
  &::-webkit-scrollbar-track {
    background: white;
  }
`;

const CardTop = styled(motion.div)`
  position: relative;
`;

const Detail = styled(motion.div)`
  width: 80%;
  border-radius: 1rem;
  margin: 2rem;
  background: white;
  position: absolute;
  left: 9%;
  top: 0;
  /* transform: translate(-50%, 0%); */
  color: black;
  overflow: hidden;
  z-index: 10;
  @media (max-width: 1200px) {
    width: 85%;
    left: 4%;
  }
  @media (max-width: 800px) {
    width: 85%;
    left: 2.5%;
  }
  img {
    width: 100%;
  }
`;

const Stats = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  width: 100%;
  padding: 0rem 2rem;
  background: rgb(212, 241, 241, 0.3);
  @media (max-width: 1200px) {
    justify-content: space-between;
    padding: 0rem 0.5rem;
  }
  .rating {
    flex: auto;
    @media (max-width: 1200px) {
      flex: unset;
      width: 60%;
      margin: 0.5rem;
    }
  }
  .publisher-name {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.25rem;
  }
  .game-name {
    font-size: 2rem;
    margin-top: 1.5rem;
    padding: 0;
    font-weight: 900;
    @media (max-width: 1200px) {
      margin-top: 0.5rem;
    }
  }
  .rating-container {
    margin: 1rem 0rem;
    a {
      color: black;
      margin: 0.75rem 0rem;
      display: block;
      line-break: anywhere;
    }
    .genre {
      display: inline-block;
      margin: 0.5rem 0.5rem 0.5rem 0rem;
      border: 1px solid white;
      padding: 0.25rem 0.5rem;
      font-size: 1rem;
      border: 1px solid black;
    }
    .star-container {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      /* margin: 0.5rem 0rem; */
      img {
        margin: 0rem 0.1rem;
        width: fit-content;
      }
      p {
        margin-left: 0.5rem;
      }
    }
  }
  h3,
  p {
    color: black;
  }
`;

const Info = styled(motion.div)`
  text-align: center;
  margin-right: 2rem;
  justify-self: flex-end;
  @media (max-width: 1200px) {
    display: none;
  }
  h3 {
    font-size: 1.5rem;
  }
`;

const Platforms = styled(motion.div)`
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 2rem;
  img {
    margin: 0rem 1rem;
    width: 70px;
    height: 70px;
  }
`;

const MetacriticScore = styled(motion.div)`
  @media (max-width: 1200px) {
    position: absolute;
    top: 0;
    right: 20px;
  }
  @media (max-width: 480px) {
    right: 10px;
  }
  .metacritic-score {
    /* position: absolute;
    top: -0.75rem;
    right: -0.75rem; */
    background: #333333;
    height: fit-content;
    border: 4px solid #ffcc34;
    padding: 0rem 1.5rem;
    padding: 0rem 1.5rem;
    border-radius: 1rem;
    margin: 1.5rem 0rem;
    @media (max-width: 480px) {
      padding: 0rem 1rem;
      margin: 1 0rem;
    }
    p {
      color: white;
      font-weight: 900;
      font-size: 4rem;
      @media (max-width: 480px) {
        font-size: 2rem;
      }
    }
  }
  .not-available {
    padding: 0.5rem 1rem;
    p {
      font-size: 4rem;
      @media (max-width: 800px) {
        font-size: 2rem;
      }
    }
  }
`;

const Media = styled(motion.div)`
  .vote {
    background: rgba(0, 0, 0, 0.6);
    border: 1px solid white;
    position: absolute;
    bottom: 50px;
    left: 50px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 1rem 2rem;
    border-radius: 1rem;
    min-width: 360px;
    max-width: 40%;
    @media (max-width: 1200px) {
      display: none;
    }
    .vote-container {
      /* border: 2px solid green; */
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .vote-title {
        margin: 0.5rem 1rem;
        color: white;
        flex-basis: 50%;
      }
      .vote-count-bar {
        background: white;
        height: 0.5rem;
        max-width: 40%;
      }
    }
  }
  .card-top-background-image {
    width: 100%;
    object-fit: cover;
    object-position: top;
    display: block;
    height: 80vh;
    opacity: 0.8;
    @media (max-width: 1200px) {
      min-height: 90vh;
    }
    @media (max-width: 800px) {
      min-height: 70vh;
    }
  }
  video {
    z-index: 1;
    width: 50%;
    bottom: 50px;
    right: 50px;
    position: absolute;
    box-shadow: 5px 5px 30px rgba(0, 0, 0, 0.6);
    @media (max-width: 1200px) {
      transform: translate(-50%, 0);
      width: 80%;
      bottom: -40px;
      left: 50%;
    }
  }
`;

const Description = styled(motion.div)`
  position: relative;
  /* margin: 13rem 5rem 5rem 5rem; */
  padding: 6rem 8rem;
  color: black;

  @media (max-width: 1200px) {
    padding: 6rem 3rem;
  }
`;

const Gallery = styled(motion.div)`
  position: relative;
  img {
    display: block;
  }
`;

export default GameDetail;
