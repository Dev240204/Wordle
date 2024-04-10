import React from 'react'
import Navbar from '../Components/Navbar'
import Profile from '../Components/Profile'
import Footer from '../Components/Footer'

const ProfilePage = () => {
  return (
    <div className='w-[980px] mx-auto'>
        <Navbar />
        <Profile />
        <Footer />        
    </div>
  )
}

export default ProfilePage