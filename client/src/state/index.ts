import { useDispatch } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

import alertReducer from "./alert/reducer";

const rootReducer = combineReducers({
  alert: alertReducer,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
});

/**
 * @see https://redux-toolkit.js.org/usage/usage-with-typescript#getting-the-dispatch-type
 */
export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
