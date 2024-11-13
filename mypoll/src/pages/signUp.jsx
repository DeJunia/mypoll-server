import React from 'react'
import { Link } from 'react-router-dom'
import useSignUp from '../myHooks/useSignUp';

const SignUp = () => {

  const { loading, error, signUpSuccess, handleInputChange, handleSubmit } = useSignUp();

  return (
    <div className='LogIn'>
      <div className="content">
        <h1>Welcome to <span>MyPoll</span> </h1>
        <h2>Sign Up</h2>
        <form className='LogForm' onSubmit={handleSubmit}>
          <div className="deLog">
            <p>Username</p>
            <input type="text" placeholder='Your name' id='username'
            onChange={handleInputChange}/>
          </div>
          <div className="deLog">
            <p>Password</p>
            <input type="password" id='password' placeholder="Password"
            onChange={handleInputChange}/>
          </div>
          <div className="deLog">
            <p>ECOWAS Identity Card (Ghana Card)</p>
            <input type="text" placeholder='GHA-123456789-0' id='ghanaCard' 
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
          {
            signUpSuccess && <p className='success'>Sign Up Successful! Please Sign In</p>
          }
        </form>
      </div>
    </div>
  )
}

export default SignUp
