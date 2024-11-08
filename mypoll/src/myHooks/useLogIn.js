import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { signinStart, signinSuccess, signinFailure } from '../reduxes/user/userSlice';
import { useNavigate } from 'react-router-dom';

const useLogIn = () => {
  const [ formData, setFormData ] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!formData.username || !formData.password ) {
      return dispatch(signinFailure('Please fill all the fields'));
    }

    try {
      dispatch(signinStart());
      const res = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(formData),
        credentials: 'include',
      });

      const data = await res.json();
      if(data.success === false){
        dispatch(settingUserFailure(data.message));
        return;
      }
      if(res.ok) {
        dispatch(signinSuccess(data));
        navigate('/');
      }else {
        dispatch(signinFailure(data.message));
      }
    } catch(error) {
      dispatch(signinFailure('Failed to login. ', error.message));
    }
  }

  return {loading, error, handleChange, handleSubmit}
}

export default useLogIn
