import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  votes: [], // Initialize votes as an empty array
  loading: false,
  error: null,
};

const voteSlice = createSlice({
  name: 'vote',
  initialState,
  reducers: {
    fetchVotesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchVotesSuccess: (state, action) => {
      state.votes = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchVotesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateVote: (state, action) => {
      const updatedVote = action.payload;
      const index = state.votes.findIndex(vote => vote.partyId === updatedVote.partyId);
      if (index !== -1) {
        state.votes[index] = updatedVote;
      } else {
        state.votes.push(updatedVote);
      }
    },
  },
});

export const { fetchVotesStart, fetchVotesSuccess, fetchVotesFailure, updateVote } = voteSlice.actions;
export default voteSlice.reducer;