import { createAction } from "@reduxjs/toolkit";
import api from "../../utils/api";
import { setAlert } from "../alert/actions";
import { AppDispatch } from "../index";

export const authSuccess = createAction<{}>("auth/success");
export const authError = createAction<void>("auth/error");
export const loginSuccess = createAction<{}>("auth/login/success");
export const loginError = createAction<void>("auth/login/error");
export const registerSuccess = createAction<void>("auth/register/success");
export const registerError = createAction<void>("auth/register/error");
export const logOut = createAction<void>("auth/logout");

export const loadUser = () => async (dispatch: AppDispatch) => {
  try {
    const res = await api.get("/auth");
    dispatch(authSuccess(res.data));
  } catch (error) {
    dispatch(authError());
  }
};

export const register = (formData: any) => async (dispatch: AppDispatch) => {
  try {
    const res = await api.post("/user", formData);

    dispatch(registerSuccess());
    loadUser()(dispatch);
  } catch (error: any) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error: { msg: string }) =>
        dispatch(setAlert(error.msg, "danger"))
      );
    }
    dispatch(registerError());
  }
};

export const login =
  (email: string, password: string) => async (dispatch: AppDispatch) => {
    const data = { email, password };

    try {
      const res = await api.post("/auth", data);

      dispatch(loginSuccess(res.data));
      loadUser()(dispatch);
    } catch (error: any) {
      const errors = error.response.data.errors;

      if (errors) {
        errors.forEach((error: { msg: string }) =>
          dispatch(setAlert(error.msg, "danger"))
        );
      }
      dispatch(loginError());
    }
  };
