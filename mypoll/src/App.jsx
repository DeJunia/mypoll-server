import React from 'react'
import Home from './pages/home'
import Stat from './pages/stat'
import Profile from './pages/profile'
import SignUp from './pages/signUp'
import LogIn from './pages/loginIn'
import PrivateRoute from './components/privateRoute'
import Ranks from './pages/ranks'
import { Routes, Route } from 'react-router-dom'
import Header from './components/header'
import Ballot from './components/ballot'
import VoteRoute from './components/voteRoute'
import Navbar from './components/navbar'

function App() {

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/signin' element={<LogIn/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path="/ballot" element={<Ballot />}/>
        <Route element={<PrivateRoute/>}>
        <Route element={<VoteRoute/>}>
          <Route path="/" element={<Home />}/>
          <Route path="/stat" element={<Stat />}/>
          <Route path="/ranks" element={<Ranks />}/>
          <Route path="/profile" element={<Profile />}/>
        </Route>
        </Route>
      </Routes>
      <Navbar />
    </div>
  )
}

export default App
