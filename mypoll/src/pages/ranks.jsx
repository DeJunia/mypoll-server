import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const Ranks = () => {
  const [parties, setParties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchParties = async () => {
      try {
        const response = await fetch('/api/parties');
        const data = await response.json();
        setParties(data);
      } catch (error) {
        setError('Error fetching parties');
      } finally {
        setLoading(false);
      }
    };

    fetchParties();

    const intervalId = setInterval(async () => {
      try {
        const response = await fetch('/api/parties');
        const data = await response.json();
        setParties((prevParties) => {
          const updatedParties = prevParties.map((party) => {
            const updatedParty = data.find((p) => p._id === party._id);
            return updatedParty ? { ...party, totalVotes: updatedParty.totalVotes } : party;
          });

          // Sort parties by totalVotes in ascending order
          const sortedParties = updatedParties.sort((a, b) => a.totalVotes - b.totalVotes);
          console.log('Sorted Parties:', sortedParties); // Debugging line
          return sortedParties;
        });
      } catch (error) {
        console.error('Error fetching updated parties:', error);
      }
    }, 20000); // 20 seconds

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  if (loading) return (
    <div className="allCont">
      <div className="loaderU"></div>
      <p>Loading parties...</p>
    </div>
  );
  if (error) return <p>{error}</p>;

  return (
    <main className='Ranks'>
      <div className="cont">
        <h4>Candidates ranks on ballot</h4>
        <div className='ranks-container'>
          <AnimatePresence>
            {parties.map((party) => (
              <motion.div className='rank-item'
                key={party._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                layout
              >
                <motion.div className='rank-item-container'
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="Head">
                    <figure>
                      <img src={party.flagBearer} alt="" />
                    </figure>
                    <div>
                      <h3>{party.flagName}</h3>
                      <p>{party.name}</p>
                    </div>
                  </div>
                  <div className='voteRank'>
                    {party.totalVotes} votes
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}

export default Ranks;