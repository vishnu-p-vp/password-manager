import { createSlice } from "@reduxjs/toolkit";

const passwordSlice = createSlice({
  name: "passwords",
  initialState: {
    list: [],
  },
  reducers: {
    setPasswords: (state, action) => {
      state.list = action.payload;
    },
    addPassword: (state, action) => {
      state.list.push(action.payload);
    },
    deletePassword: (state, action) => {
      state.list = state.list.filter(p => p._id !== action.payload);
    },
  },
});

export const { setPasswords, addPassword, deletePassword } = passwordSlice.actions;
export default passwordSlice.reducer;