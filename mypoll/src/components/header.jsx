import React from 'react'
import { NavLink } from 'react-router-dom';
import { useFeatureContext } from '../context/featureContext';
import { IoBarChart } from "react-icons/io5";
import { BiSolidPieChartAlt2 } from "react-icons/bi";
import { RiHomeFill } from "react-icons/ri";

const Header = () => {

  const { logo, toggleDarkMode, toggleLightMode, currentUser, toProfile  } = useFeatureContext();
  return (
    <div className='Header'>
       <div className='logo'>
        <NavLink>
            <h1>{logo}</h1>
        </NavLink>
      </div>
    
        <nav className='HeaderMdNav lg'>
          <ul>
            <li><NavLink to='/'><RiHomeFill className='Icon'/>Home</NavLink></li>
            <li><NavLink to='/ranks'>
            <BiSolidPieChartAlt2 className='Icon'/>Rankings</NavLink></li>
            <li><NavLink to='/stat'><IoBarChart className='Icon'/>Stats</NavLink></li>
          </ul>
        </nav>

        <div className="modes">
          <button className='mode light' onClick={toggleLightMode}>
          </button>
          <button className='mode dark'
          onClick={toggleDarkMode}>
          </button>
          {currentUser ? (
            <img src={ currentUser.profilePic } alt="profile" className='profileImg' onClick={toProfile}/>
          ) : <li>Sign in</li>} 
      </div>
      
    </div>
  )
}

export default Header
