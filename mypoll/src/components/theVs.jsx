import React from 'react';
import { useSelector } from 'react-redux';
import { FcBullish } from "react-icons/fc";
import { Link } from 'react-router-dom';

const TheVs = () => {
  const { votes } = useSelector((state) => state.vote);

  if (!votes || votes.length === 0) {
    return <div className="poll-container">
      <p>Check out myPoll voting analysis</p>
      <Link to="/stat">
      <FcBullish className='Icon'/> <p>myPoll voting analysis</p>
      </Link>
      <p>We need a peaceful election this year. Our motion is to digitalize the election process in the upcoming years.</p>
      <div className="poll-notes">
        Notes: MyPoll is conducting this poll from Nov 9 to Dec 1, surveying 10,000 registered voters nationally.
      </div>
    </div>;
  }

  // Sort and select the top 2 candidates
  const topCandidates = [...votes]
    .sort((a, b) => b.votes - a.votes)
    .slice(0, 2);

  return (
    <div className="poll-container">
      <div className="poll-candidates">
        {topCandidates.map((candidate) => (
          <div className="candidate" key={candidate.name}>
            <figure>
              <img
                src={candidate.flagBearer}
                alt={candidate.name}
                className="candidate-img"
              />
            </figure>   
            <div className="candidate-name">{candidate.flagName}</div>
            <div className="candidate-votes">{candidate.percentage}%</div>
          </div>
        ))}
      </div>
      

      <div className="poll-bar">
        {topCandidates.map((candidate, index) => (
          <div
            key={candidate.name}
            style={{
              ...styles.progress,
              width: `${candidate.percentage}%`,
              backgroundColor: index === 0 ? '#007bff' : '#dc3545', // Blue for the first, Red for the second
            }}
          ></div>
        ))}
      </div>

      <div className="poll-notes">
        Notes: MyPoll is conducting this poll from Nov 9 to Dec 1, surveying 10,000 registered voters nationally.
      </div>
    </div>
  );
};

const styles = {
  progress: {
    height: '5px',
    margin: '10px 0',
    borderRadius: '8px',
    transition: 'width 0.5s ease-in-out',
  },
};

export default TheVs;
