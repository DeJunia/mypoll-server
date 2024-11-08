import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchVotesStart, fetchVotesSuccess, fetchVotesFailure } from '../reduxes/votes/voteSlice';
import { updateHasVoted } from '../reduxes/user/userSlice';
import { useNavigate } from 'react-router-dom';

const useVote = () => {
  const [parties, setParties] = useState([]);
  const [selectedParty, setSelectedParty] = useState(null);
  const [loading, setLoading] = useState(false);
  const [partyLoad, setPartyLoad] = useState(false);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchParties = async () => {
      try {
        setPartyLoad(true);
        const res = await fetch('/api/parties');
        const data = await res.json();
        setParties(data);
        setPartyLoad(false);
      } catch (error) {
        setError(true);
        setPartyLoad(false);
        console.log('Error fetching parties: ', error);
      }
    };
    fetchParties();

    const intervalId = setInterval(async () => {
      try {
        const res = await fetch('/api/parties');
        const data = await res.json();
        setParties(data);
      } catch (error) {
        console.error('Error fetching updated parties:', error);
      }
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const handleVote = async () => {
    if (!selectedParty) return;
    setLoading(true);

    try {
      const res = await fetch('/api/votes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ partyId: selectedParty }),
        credentials: 'include',
      });

      const data = await res.json();

      if (res.ok) {
        dispatch(updateHasVoted());
        alert('Vote cast successfully');
        navigate('/');
      }
    } catch (error) {
      setError(true);
      console.log('Error casting vote: ', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    parties,
    selectedParty,
    setSelectedParty,
    loading,
    partyLoad,
    error,
    handleVote,
  };
};

export default useVote;