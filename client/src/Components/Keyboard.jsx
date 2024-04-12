import { React, useEffect, useCallback, useContext } from 'react'
import Key from './Key'
import { AppContext } from '../App'

const Keyboard = () => {
  const line1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"]
  const line2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"]
  const line3 = ["Z", "X", "C", "V", "B", "N", "M"]
  const allkeys = [...line1, ...line2, ...line3]

  const { onSelectLetter, onDelete, onEnter, currAttempt,disabledLetters } = useContext(AppContext)

  const handleKeyDown = useCallback((event) => {
    if (currAttempt.Attempt > 5){
      alert('Game Over')
      return;
    }else{
      if(event.key === 'Enter'){
        onEnter()
      }else if(event.key === 'Backspace'){
        onDelete()
      }else{
        allkeys.forEach((key) => {
          if (event.key.toUpperCase() === key){
            onSelectLetter(key)
          }
        })
      }
    }
  })

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  },[handleKeyDown])

  return (
    <div className='w-[700px] h-[300px] mt-12'>
      <div className="flex flex-row justify-center mx-2">
        {line1.map((key) => {
          return (
           <Key key={key} letter={key} disabled={disabledLetters.includes(key)} />
          )
        })}
      </div>
      <div className="flex flex-row justify-center mx-2">
      {line2.map((key) => {
          return (
            <Key key={key} letter={key} disabled={disabledLetters.includes(key)} />
           )
        })}
      </div>
      <div className="flex flex-row justify-center mx-2">
      <Key letter={"ENTER"} bigKey/>
      {line3.map((key) => {
          return (
            <Key key={key} letter={key} disabled={disabledLetters.includes(key)} />
           )
        })}
      <Key letter={"DELETE"} bigKey />
      </div>
    </div>
  )
}

export default Keyboard