import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signinStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signinSuccess: (state, action) => {  
      state.currentUser = action.payload;  
      state.loading = false;
      state.error = null;
    },
    signinFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signOut: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    updateHasVoted: (state) => {
      if (state.currentUser) {
        state.currentUser.hasVoted = true;
      }
    },
  },
});

export const { signinStart, signinSuccess, signinFailure, signOut, updateHasVoted } = userSlice.actions;

export default userSlice.reducer;
