import React, {useEffect, useState} from 'react'

const totalVotes = () => {
  const [vtotalVotes, setTotalVotes] = useState(0);
  const [vloading, setLoading] = useState(true);
  const [verror, setError] = useState(null);

  useEffect(() => {
    const fetchTotalVotes = async () => {
      try {
        const response = await fetch('https://mypollserver.vercel.app/api/votes/total');
        const data = await response.json();
        setTotalVotes(data.totalVotes);
      } catch (error) {
        setError('Error fetching total votes');
      } finally {
        setLoading(false);
      }
    };

    fetchTotalVotes();

    const intervalId = setInterval(fetchTotalVotes, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return {
    vtotalVotes,
    vloading,
    verror,
  };
}

export default totalVotes
