import React, { useState } from 'react'
import { MdOutlineLeaderboard } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { FaRegQuestionCircle } from "react-icons/fa";
import Leaderboard from './Leaderboard';
import useAuthStore from '../Context/AuthStore';
import Rules from './Rules';

const Navbar = ({ isAuthenticated }) => {
  const [showLeaderboard, setShowLeaderboard] = useState(false)
  const [showRules, setShowRules] = useState(false);

  const handleprofile = () => {
    if(isAuthenticated){
      window.location.href = '/profile'
    }
  }
  const displayRule = () => {
    setShowRules(!showRules);
  };
  const displayLeaderboard = () => {
    if(isAuthenticated){
      setShowLeaderboard(!showLeaderboard)
    }
  }
  const handleLogout = () => {
    useAuthStore.getState().logout()
  }
  return (
    <div className='flex flex-row justify-between items-center h-16 border-b-[1px] border-gray-500'>
        <div className="w-full mx-10 flex flex-row items-center justify-between">
          <div className='flex-1'>
          </div>
            <div className='text-4xl font-semibold flex-1 flex justify-center'>
              WORDLE
            </div>
            <div className='flex flex-row gap-5 flex-1 justify-end'>
                <button onClick={displayRule}>
                  <FaRegQuestionCircle className='text-2xl'/>
                </button>
                <button onClick={displayLeaderboard}>
                  <MdOutlineLeaderboard className='text-2xl'/>
                </button>
                <button onClick={handleprofile}>
                    <FaRegUserCircle className='text-2xl'/>
                </button>
                {isAuthenticated && (
                  <button onClick={handleLogout} className='shadow-sm rounded-md shadow-gray-500 p-2 font-semibold'>
                    Logout
                  </button>
                )}
            </div>
        </div>
        <Leaderboard showLeaderboard={showLeaderboard} setShowLeaderboard={setShowLeaderboard} />
        <Rules showRules={showRules} setShowRules={setShowRules} />
    </div>
  )
}

export default Navbar