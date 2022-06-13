import { useDispatch } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

// user defined
import authReducer from "./auth/reducer";
import alertReducer from "./alert/reducer";
import setAuthToken from "../utils/setAuthToken";

const rootReducer = combineReducers({
  auth: authReducer,
  alert: alertReducer,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
});

/*
  initialize current state from redux store for subscription comparison
  preventing undefined error
 */
let currentState = store.getState();
store.subscribe(() => {
  let previousState = currentState;
  currentState = store.getState();

  if (previousState.auth.token !== currentState.auth.token) {
    const token = currentState.auth.token;
    setAuthToken(token);
  }
});

/**
 * @see https://redux-toolkit.js.org/usage/usage-with-typescript#getting-the-dispatch-type
 */
export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
