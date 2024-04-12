import React, { useState } from 'react'
import { MdOutlineLeaderboard } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { FaRegQuestionCircle } from "react-icons/fa";
import Leaderboard from './Leaderboard';
import useAuthStore from '../Context/AuthStore';

const Navbar = () => {
  const [showLeaderboard, setShowLeaderboard] = useState(false)
  const displayLeaderboard = () => {
    setShowLeaderboard(!showLeaderboard)
  }
  const displayRule = () => {
    console.log('Rule')
  }
  const handleLogout = () => {
    useAuthStore.getState().logout()
  }
  return (
    <div className='flex flex-row justify-between items-center h-16 border-b-[1px] border-gray-500'>
        <div className="w-full mx-10 flex flex-row items-center justify-between">
            <div className='logo'>
              {/* <img src="/images/logo.png" alt="" className='' /> */}
              LOGO
            </div>
            <div className='flex flex-row gap-5'>
                <button onClick={displayRule}>
                  <FaRegQuestionCircle className='text-2xl'/>
                </button>
                <a href="/profile">
                  <FaRegUserCircle className='text-2xl'/>
                </a>
                <button onClick={displayLeaderboard}>
                  <MdOutlineLeaderboard className='text-2xl'/>
                </button>
                <button onClick={handleLogout}>
                  Logout
                </button>
            </div>
        </div>
        <Leaderboard showLeaderboard={showLeaderboard} />
    </div>
  )
}

export default Navbar