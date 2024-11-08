import React from 'react'
import HomeSlider from '../components/HomeSlider';
import { useFeatureContext } from '../context/featureContext';

const Home = () => {

  const { timeLeft, formatTime } = useFeatureContext();

  return (
    <main className="Home">
      <div className="content">
        <HomeSlider/>
        <div className="timediv">
          <p>To general elections:</p>
          <div className="timelef">
            <div className="countdown-item">
                <div className="flip">{timeLeft.days}</div>
            </div>
            <span>:</span>
            <div className="countdown-item">
              <div className="flip">{timeLeft.hours}</div>
            </div>
            <span>:</span>
            <div className="countdown-item">
              <div className="flip">{formatTime(timeLeft.minutes)}</div>
            </div>
            <span>:</span>
            <div className="countdown-item">
              <div className="flip">{formatTime(timeLeft.seconds)}</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Home