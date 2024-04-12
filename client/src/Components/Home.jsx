import React, { useState, useRef, useContext } from "react";
import Board from "./Board";
import Keyboard from "./Keyboard";
import GameOver from "./GameOver";
import { AppContext } from "../App";

const Home = (props) => {
  const { gameover } = useContext(AppContext)
  return (
    <div className="w-full h-[calc(100vh-64px)px] mt-12 flex flex-col items-center">
      <Board />
      {gameover.gameover ? <GameOver /> : <Keyboard />}
    </div>
  )
};

export default Home;