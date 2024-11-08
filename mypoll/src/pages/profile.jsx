import React from 'react'
import { useSelector } from 'react-redux'
import { BsFileEarmarkLock2 } from "react-icons/bs";
import { IoCloudDoneOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { CiCoffeeCup } from "react-icons/ci";
import { FaGithub } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { BsLinkedin } from "react-icons/bs";
import { FaTiktok } from "react-icons/fa6";


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
        <div className='cofe'>
          <Link to='https://api.whatsapp.com/send/?phone=233534582327&text&type=phone_number&app_absent=0'>
            <CiCoffeeCup className='Icon'/> <p>By me coffee</p>
          </Link>
        </div>
        <div className='follow'>
          <Link to='https://github.com/DeJunia'>
          <FaGithub className='Icon'/>
          </Link>
          <Link to='https://api.whatsapp.com/send/?phone=233534582327&text&type=phone_number&app_absent=0'>
          <FaWhatsapp className='Icon'/>
          </Link>
          <Link to='https://www.linkedin.com/in/de-junia-291ab4307/'>
          <BsLinkedin className='Icon'/>
          </Link>
          <Link to='https://www.tiktok.com/@dejunia24'>
          <FaTiktok className='Icon'/>
          </Link>
        </div>
      </div>    
    </main>
  )
}

export default Profile
