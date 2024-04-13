import React from 'react';
import { RxCross2 } from "react-icons/rx";

const Rules = ({showRules, setShowRules}) => {

const handleclick = () => {
    setShowRules(!showRules)
}
  return (
    <div className="fixed top-0 right-0 mt-16 mr-10">
      {showRules && (
        <div className="bg-white text-black font-medium shadow-md rounded-md p-4 mt-4">
            <div className="pb-1 border-b-[1px] border-black flex flex-row items-center justify-between">
                <h1 className="text-2xl font-bold">Rules</h1>
                <RxCross2 className='cancel text-2xl cursor-pointer' onClick={handleclick}/>
            </div>
          <ol className="list-decimal pl-4">
            <li className='text-[16px]'>Guess the hidden five-letter word.</li>
            <li className='text-[16px]'>You have six attempts to guess the word.</li>
            <li className='text-[16px]'>Each letter can only be guessed once per attempt.</li>
            <li className='text-[16px]'>If a letter is in the correct position, it will be marked as green.</li>
            <li className='text-[16px]'>If a letter is in the word but in the wrong position, it will be marked as yellow.</li>
            <li className="mt-2">Points:</li>
            <ul className="list-disc pl-8">
              <li>Correct guess: +10 points</li>
              <li>Incorrect guess: -5 points</li>
            </ul>
            <li className="mt-2">Streak:</li>
            <ul className="list-disc pl-8">
              <li>A streak is maintained for consecutive correct guesses.</li>
              <li>The streak is reset if an incorrect guess is made.</li>
            </ul>
          </ol>
        </div>
      )}
    </div>
  );
};

export default Rules;
