import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./Routes/HomePage"
import Authentication from "./Components/auth/Authentication";
import useAuthStore from "./Context/AuthStore";
import ProfilePage from "./Routes/ProfilePage";
import { boardDefault } from "./Components/Words";
import { useState, createContext, useEffect } from "react";
import axios from "axios";

export const AppContext = createContext();

function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [board, setBoard] = useState(boardDefault)
  const [currAttempt, setCurrAttempt] = useState({Attempt:0, letterPos:0})
  const [disabledLetters, setDisabledLetters] = useState([])
  const [gameover, setGameover] = useState({gameover: false, guessedWord: false})
  const [correctWord, setCorrectWord] = useState("")
  const url = process.env.API_URL || 'http://localhost:5000/';

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${url}word`)
      console.log(response.data.data)
      setCorrectWord(response.data.data)
    }
    fetchData()
  },[])

  const insertWord = async (word) => {
    try{
      const response = await axios.post(`${url}word`, {word: word})
      console.log("Word Inserted :",response)
    }catch(e){
      console.log(e)
    }
  }

  // const correctWord = "RIGHT"

  const onSelectLetter = (letter) => {
    if (currAttempt.letterPos > 4) return; 
    const newBoard = [...board];
    newBoard[currAttempt.Attempt][currAttempt.letterPos] = letter;
    setBoard(newBoard);
    setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos + 1 });
  }

  const onDelete = () => {
    if (currAttempt.letterPos === 0) return; 
    const newBoard = [...board];
    newBoard[currAttempt.Attempt][currAttempt.letterPos - 1] = "";
    setBoard(newBoard);
    setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos - 1 })
  }

  const onEnter = async () => {
    try{
      if (currAttempt.letterPos !== 5) return;
      let currWord = ""
      for(let i = 0; i < 5; i++){
        currWord += board[currAttempt.Attempt][i]
      }
      const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${currWord}`)
      if(response.status === 200){
        insertWord(currWord)
        setCurrAttempt({ Attempt: currAttempt.Attempt + 1, letterPos: 0 });
      }else{
        alert('Not a valid word')
      }

      if(currWord === correctWord){
        setGameover({gameover: true, guessedWord: true})
        return
      }
      if(currAttempt.Attempt === 5){
        setGameover({gameover: true, guessedWord: false})
      }
    }catch(e){
      alert('Not a valid word')
    }
  }

  return (
    <AppContext.Provider value={{ board, setBoard, currAttempt, setCurrAttempt, onSelectLetter, disabledLetters, setDisabledLetters, gameover, setGameover, correctWord, setCorrectWord, onDelete, onEnter, correctWord}}>
      <Router>
        <Routes>
            <Route path="/auth" element={<Authentication />} />
            <Route path="/" element={isAuthenticated ? <HomePage /> : <Navigate to="/auth" replace />} />
            <Route path="/profile" element={isAuthenticated ? <ProfilePage /> : <Navigate to="/auth" replace />} />
        </Routes>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
