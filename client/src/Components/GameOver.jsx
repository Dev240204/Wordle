import { React, useContext, useEffect } from 'react'
import { AppContext } from '../App'
import axios from 'axios'
import useAuthStore from '../Context/AuthStore'

const Gameover = () => {
    const { gameover, currAttempt, correctWord, url } = useContext(AppContext)
    
    useEffect(() => {
      const isGame = localStorage.getItem('isGame')
      if(isGame){
        const updateUser = async () => {
          if (gameover.guessedWord) {
            const user = JSON.parse(localStorage.getItem('user'));
            await axios.put(`${url}user/${user._id}`, {
              word: correctWord,
              streakBool: true,
            });
          } else {
            const user = JSON.parse(localStorage.getItem('user'));
            await axios.put(`${url}user/${user._id}`, {
              word: correctWord,
              streakBool: false,
            });
          }
        };
        updateUser();
        localStorage.removeItem('isGame');
      }
    },[gameover, correctWord]);

    const NewGame = () => {
      useAuthStore.getState().isGameTrue();
      window.location.reload()
    }
  return (
    <div className='mt-5 flex flex-col'>
        <h3 className='text-5xl font-bold'>{gameover.guessedWord ? "You Correctly guessed" : "You Failed to guess"}</h3>
        <h1 className='mt-5 text-3xl'>Correct Word : {correctWord}</h1>
        {gameover.guessedWord && (
            <h3 className='text-2xl mt-5'>Your Attempts : {currAttempt.Attempt}</h3>
        )}
        <button onClick={NewGame} className='border-2 border-gray-400 rounded-md p-2 bg-transparent font-bold text-2xl mt-5'>New Game</button>
    </div>
  )
}

export default Gameover