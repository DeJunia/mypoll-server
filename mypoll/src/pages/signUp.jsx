import React from 'react'
import { Link } from 'react-router-dom'
import useSignUp from '../myHooks/useSignUp';

const SignUp = () => {

  const { loading, error, handleInputChange, handleSubmit } = useSignUp();

  return (
    <div className='LogIn'>
      <div className="content">
        <h1>Welcome to <span>MyPoll</span> </h1>
        <h2>Sign Up</h2>
        <form className='LogForm' onSubmit={handleSubmit}>
          <div className="deLog">
            <p>Username</p>
            <input type="text" placeholder='Enoch Appiagyei' id='username'
            onChange={handleInputChange}/>
          </div>
          <div className="deLog">
            <p>Password</p>
            <input type="password" id='password' 
            onChange={handleInputChange}/>
          </div>
          <div className="deLog">
            <p>ECOWAS Identity Card (Ghana Card)</p>
            <input type="text" defaultValue="GHA-XXXXXXXXX-X" id='ghanaCard' 
            onChange={handleInputChange}/>
          </div>
         <button type='submit' disabled={loading}> 
          {
            loading? (<p className='loader'></p> 
            ) : (<p>Sign Up</p>)
          }    
         </button>
            <Link to='/signin' className='SignLink'>Sign In</Link>
          <div>
            {
              error && <p className='error'>Wrong Credentials! Change it</p>
            }
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp
