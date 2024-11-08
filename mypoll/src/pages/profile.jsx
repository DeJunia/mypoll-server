import React from 'react'
import { useSelector } from 'react-redux'
import { BsFileEarmarkLock2 } from "react-icons/bs";
import { IoCloudDoneOutline } from "react-icons/io5";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <main  className='Profile'>
      
      <div className="content">
        <h1>Your profile</h1>
        <img src={currentUser.profilePic} alt="profile" />
        <p>User Details</p>
        <h2>{currentUser.username}</h2>
        <h2>{currentUser.ghanaCard}</h2>
        {currentUser.hasVoted ? (
          <>
          <div className='votef'>You've voted <IoCloudDoneOutline className='Icon blue'/></div>

          </>
        ) : (
          <h2 className='error'>You haven't voted yet <span><BsFileEarmarkLock2 className='Icon error'/></span></h2>
        )}
      </div>    
    </main>
  )
}

export default Profile
