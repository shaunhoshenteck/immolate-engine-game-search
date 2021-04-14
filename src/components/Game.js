import React from "react";
//Styling and Animation
import styled from "styled-components";
import { motion } from "framer-motion";
//Redux
import { useDispatch } from "react-redux";
import loadDetail from "../actions/detailAction";
import { Link } from "react-router-dom";
import { smallImage } from "../util";
import { popup } from "../animations";

const Game = ({ name, released, image, id }) => {
  const stringPathId = id.toString();
  const dispatch = useDispatch();
  //Load Detail Handler
  const loadDetailHandler = () => {
    document.body.style.overflow = "hidden";
    dispatch(loadDetail(id));
  };

  return (
    <Link to={`/game/${id}`}>
      <StyledGame
        variants={popup}
        initial="hidden"
        animate="show"
        layoutId={`image ${stringPathId}`}
        style={{
          background: `url(${smallImage(image, 640)})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        onClick={loadDetailHandler}
      >
        <div className="title">
          <motion.h3 layoutId={`title ${stringPathId}`}>{name}</motion.h3>
          <p>{released}</p>
        </div>
      </StyledGame>
    </Link>
  );
};

const StyledGame = styled(motion.div)`
  min-height: 40vh;
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  border-radius: 1rem;
  .details-container {
    height: 100%;
    background-size: cover !important;
    background-position: top !important;
    border-radius: 1rem;
    position: relative;
  }
  a {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height: 100%;
  }
  .title {
    text-align: left;
    width: 100%;
    padding: 1.5rem;
    z-index: 1;
    h3,
    p {
      width: 100%;
      color: white;
      padding: 0;
      text-shadow: 0px 5px 10px black;
      font-weight: 900;
    }
  }
`;

export default Game;
