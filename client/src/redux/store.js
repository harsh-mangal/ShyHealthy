import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from "redux";
import { alertsSlice } from "./alertsSlice";
import { userSlice } from './userSlice';

const rootreducer = combineReducers({
  alerts: alertsSlice.reducer,
  user : userSlice.reducer,
});

const store = configureStore({
  reducer: rootreducer,
});

export default store;
