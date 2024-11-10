import React from 'react'
import useLogIn from '../myHooks/useLogIn'
import useSignUp from '../myHooks/useSignUp'
import { Link } from 'react-router-dom'

const LogIn = () => {

  const { loading, error, handleChange, handleSubmit } = useLogIn();
  const { signUpSuccess } = useSignUp();

  return (
    <div className='LogIn'>
      <div className="content">
        <h1>Welcome to <span>MyPoll</span></h1>
        <h2>Sign In</h2>
        <form className='LogForm' onSubmit={handleSubmit}>
          <div className="deLog">
            <p>Username</p>
            <input type="text" placeholder='Enoch Appiagyei' id='username'
            onChange={handleChange}/>
          </div>
          <div className="deLog">
            <p>Password</p>
            <input type="password" id='password' 
            onChange={handleChange}/>
          </div>
         <button type='submit' disabled={loading}> 
          {
            loading? (<p className='loader'></p> 
            ) : (<p>Sign In</p>)
          }    
         </button>
            <Link to='/signUp' className='SignLink'>Sign Up</Link>
          <div>
            {
              error && <p className='error'>Wrong Credentials! Change it</p>
            }
            {
              signUpSuccess && <p className='success'>Sign Up Successful! Please Sign In</p>
            }
          </div>
        </form>
      </div>
    </div>
  )
}

export default LogIn
