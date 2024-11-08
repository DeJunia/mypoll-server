import React from 'react'
import { NavLink } from 'react-router-dom'
import { IoBarChart } from "react-icons/io5";
import { BiSolidPieChartAlt2 } from "react-icons/bi";
import { RiHomeFill } from "react-icons/ri";

const Navbar = () => {
  return (
    <div className='Navbar sm'>
      <NavLink to='/'><RiHomeFill className='Icon' /><p>Home</p></NavLink>
      <NavLink to='/ranks'><BiSolidPieChartAlt2 className='Icon' /><p>Ranking</p></NavLink>
      <NavLink to='/stat'><IoBarChart className='Icon' /><p>Stats</p></NavLink>
    </div>
  )
}

export default Navbar
