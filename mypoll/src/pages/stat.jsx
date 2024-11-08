import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVotesStart, fetchVotesSuccess, fetchVotesFailure } from '../reduxes/votes/voteSlice';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import GradientProgressBar from '../components/progressBar';
import totalVotes from '../myHooks/totalVotes';
import { IoMdFingerPrint } from "react-icons/io";

const Stat = () => {
  const dispatch = useDispatch();
  const { votes, loading, error } = useSelector((state) => state.vote);
  const { vtotalVotes, vloading, verror } = totalVotes();

  useEffect(() => {
    const fetchResults = async () => {
      dispatch(fetchVotesStart());
      try {
        const res = await fetch('https://mypollserver.vercel.app/api/votes/results');
        const data = await res.json();
        dispatch(fetchVotesSuccess(data));
      } catch (error) {
        dispatch(fetchVotesFailure(error.message));
      }
    };

    fetchResults();

    const intervalId = setInterval(fetchResults, 20000); // 20 seconds

    return () => {
      clearInterval(intervalId);
    };
  }, [dispatch]);

  return (
    <main className="Stat">
      <div className="content chart">
        <div className="head">
          <h2>Results</h2>
          {vloading ? (
            <div className="allCont">
              <div className="loaderU"></div>
              <p>Loading Results...</p>
            </div>
          ) : (
            <p className='totalVotes'><IoMdFingerPrint className='Icon' /> {vtotalVotes}</p>
          )}
        </div>

        <div className="progresBar">
          {votes.map((vote) => (
            <div key={vote.name} className='progresBarItem'>
              <div className="top">
                <img src={vote.flag} alt={vote.flag} width={24} height={24} />
                <GradientProgressBar value={vote.percentage} />
              </div>
              <div className="down">
                <p>{vote.name}</p>
                <p>{vote.totalVotes}</p>
              </div>
            </div>
          ))}
        </div>

        <h2>Chart</h2>

        {loading ? (
          <div className="allCont">
            <div className="loaderU"></div>
            <p>Loading charts...</p>
          </div>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <div className="charts">
            <ResponsiveContainer width="100%" height={300} className='barChart'>
              <BarChart
                data={votes}
                margin={{
                  top: 5,
                  right: 10,
                  left: 2,
                  bottom: 7,
                }}
                barSize={20}
              >
                <XAxis dataKey="name" className='anytxt' />
                <YAxis className='anytxt' />
                <Tooltip />
                <Bar dataKey="totalVotes" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </main>
  );
}

export default Stat;