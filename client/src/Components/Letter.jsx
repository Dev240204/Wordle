import { React, useContext, useEffect } from "react";
import { AppContext } from "../App";

const Letter = ({ letterPos, attemptVal }) => {
  const { board, correctWord, currAttempt, setDisabledLetters} = useContext(AppContext);
  const letter = board[attemptVal][letterPos];

  const correct = correctWord[letterPos] === letter;
  const almost = !correct && letter !== "" && correctWord.includes(letter);

  const letterState = currAttempt.Attempt > attemptVal && (correct ? "#4dcf44" : almost ? "#d9bc2c" : "#333333");

  useEffect(() => {
      if(letter !== "" && !correct && !almost){
          setDisabledLetters((prev) => [...prev, letter])
      }
  },[currAttempt.Attempt])

  return (
    <div className="">
      <div
        className="text-[30px] font-bold border-2 border-gray-500 bg-transparent w-[52px] h-[52px] focus:outline-none flex items-center justify-center"
        style={{ backgroundColor: letterState }}
      >
        {letter}
      </div>
    </div>
  );
};

export default Letter;
