import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useSignUp = () => {
  const [ formData, setFormData ] = useState({});
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState(false);
  const navigate = useNavigate();
  
  const handleInputChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      setLoading(true);
      const res = await fetch('https://mypollserver.vercel.app/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
      })
      const data = await res.json();
      setLoading(false);
      if(data.success === false) {
        setError(true);
        return
      }
      if(res.ok) {
        navigate('/signin');
      } else {
        setError(true);
        const data = await res.json();
        console.log(data);
      }
    } catch(error) {
      setError(true);
      setLoading(false);
    }
  }
  return {
    handleInputChange, handleSubmit, loading, error
  }
}

export default useSignUp
