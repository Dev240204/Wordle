import React, { useContext } from "react";
import { AppContext } from "../App";

const Key = ({ letter, bigKey, disabled }) => {
  const { onSelectLetter, onDelete, onEnter } =
    useContext(AppContext);
  const selectLetter = () => {
    if (letter === "ENTER") {
        onEnter()   
    }else if (letter === "DELETE") {
        onDelete()
    }else{
       onSelectLetter(letter)
    }
  };
  return (
    <div
      className={`w-${
        bigKey ? "[100px]" : "[52px]"
      } text-[25px] m-1 font-bold rounded bg-gray-600 h-[70px] focus:outline-none flex items-center justify-center cursor-pointer px-2`}
      onClick={selectLetter}
      style = {{backgroundColor: disabled ? '#333333' : '#4b5563'}}
    >
      {letter}
    </div>
  );
};

export default Key;
