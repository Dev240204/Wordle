import React from 'react'
import { MdOutlineLeaderboard } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { FaRegQuestionCircle } from "react-icons/fa";

const Navbar = () => {
  const displayLeaderboard = () => {
    alert('Leaderboard')
  }
  return (
    <div className='bg-black flex flex-row justify-between items-center h-20'>
        <div className="w-[980px] mx-auto flex flex-row items-center justify-between">
            <div className='logo'>
              {/* <img src="/images/logo.png" alt="" className='' /> */}
              LOGO
            </div>
            <div className='flex flex-row gap-5'>
                <a href="#">
                  <FaRegQuestionCircle className='text-2xl'/>
                </a>
                <a href="/profile">
                  <FaRegUserCircle className='text-2xl'/>
                </a>
                <button onClick={displayLeaderboard}>
                  <MdOutlineLeaderboard className='text-2xl'/>
                </button>
            </div>
        </div>
    </div>
  )
}

export default Navbar