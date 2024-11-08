import React, { createContext, useContext, useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';


export const useFeatureContext = () => {
  return useContext(FeatureContext);
}

export const FeatureContext = createContext();

export const FeatureContextProvider = ({children}) => {

  const [ theme, setTheme ] = useState('light');
  const [isFocus, setIsFocus] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const logo = 'MyPoll'
  const date = new Date().getFullYear();
  const location = useLocation();
  const { currentUser } = useSelector((state) => state.user)
  const [dasActiveTab, setDasActiveTab] = useState('DashHome');


  const isSearchPageActive = location.pathname === '/searchPage'


  useEffect(() => {
    const saveTheme = localStorage.getItem('theme') || 'light';
    setTheme(saveTheme);
    document.documentElement.className = saveTheme;
  }, []);

  const toggleLightMode = () => {
    setTheme('light');
    document.documentElement.className = 'light';
    localStorage.setItem('theme', 'light')
  }

  const toggleDarkMode = () => {
    setTheme('dark');
    document.documentElement.className = 'dark';
    localStorage.setItem('theme', 'dark');
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const toggleBack = () => {
    navigate(-1);
  }
  
  const handleFocus = () => {
    setIsFocus(true);
    navigate('./searchPage')
  }
  
  const targetDate = new Date("December 7, 2024 00:00:00").getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        // Reset to zero when the countdown is finished
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    const intervalId = setInterval(updateCountdown, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [targetDate]);

  // Helper function to add leading zero to minutes and seconds
  const formatTime = (time) => (time < 10 ? `0${time}` : time);

  const toProfile = () => {
    navigate('/profile')
  }



  return (
    <FeatureContext.Provider value={{
      theme, toggleLightMode, toggleDarkMode, logo, toggleBack, isFocus, setIsFocus, handleFocus, isSearchPageActive, date, sidebarOpen, toggleSidebar, currentUser,  dasActiveTab, setDasActiveTab, toProfile, timeLeft, formatTime
    }}>
      {children}
    </FeatureContext.Provider>
  )
}