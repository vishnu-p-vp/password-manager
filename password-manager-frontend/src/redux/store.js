import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import passwordReducer from "./passwordSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    passwords: passwordReducer,
  },
});

export default store;