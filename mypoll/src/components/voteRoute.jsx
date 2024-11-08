import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const VoteRoute = () => {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser && currentUser.hasVoted ? <Outlet /> : <Navigate to="/ballot" />;
};

export default VoteRoute;