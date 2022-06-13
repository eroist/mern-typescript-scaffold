import { createReducer } from "@reduxjs/toolkit";
import {
  authSuccess,
  authError,
  loginSuccess,
  loginError,
  registerSuccess,
  registerError,
  logOut,
} from "./actions";

export interface Auth {
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  user: any;
}

export const initialState: Auth = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  loading: true,
  user: null,
};

export default createReducer<Auth>(initialState, (builder) =>
  builder
    .addCase(authSuccess, (state, { payload }) => {
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    })
    .addCase(authError, (state) => {
      return { ...state };
    })
    .addCase(loginSuccess, (state, { payload }) => {
      return { ...state, ...payload, isAuthenticated: true, loading: false };
    })
    .addCase(loginError, (state) => {
      return { ...state };
    })
    .addCase(registerSuccess, (state, { payload }) => {
      return {
        ...state,
        ...payload,
      };
    })
    .addCase(registerError, (state) => state)
    .addCase(logOut, (state) => {
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      };
    })
    .addDefaultCase((state) => state)
);
