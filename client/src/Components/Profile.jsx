import React, { useContext, useState, useEffect } from 'react'
import { AppContext } from '../App'
import axios from 'axios'

const Profile = () => {
  const {url} = useContext(AppContext)
  const [user, setUser] = useState({})
  const userid = JSON.parse(localStorage.getItem('user'))._id

  useEffect(() => {    
    const fetchData = async () => {
      const response = await axios.get(`${url}profile/${userid}`)
      setUser(response.data.data)
    }
    fetchData()
  },[])
  return (
    <div className="m-16 p-5 border-[1px] rounded-xl shadow-md shadow-gray-500 border-gray-500">
      <div className='text-6xl'>Profile</div>
      <div className='text-3xl mt-5'>Name: {user.name}</div>
      <div className='text-3xl mt-5'>Score: {user.score}</div>
      <div className='text-3xl mt-5'>Streak: {user.streaks}</div>
      <div className='text-3xl mt-5'>Words Guessed</div>
      {user.wordsGuessed && user.wordsGuessed.length !== 0 && (
        <div className="mt-3 p-3 border-[1px] rounded-xl shadow-md border-gray-500">
          {user.wordsGuessed && user.wordsGuessed.map((word, index) => (
            <div key={index} className='text-2xl mt-5 inline'> {word}{`,`}</div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Profile