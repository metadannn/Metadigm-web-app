import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../../configurations/store";
import { SignInFormValues } from "../models/sign-in-form-values";
import { SignInState } from "../models/sign-in-state";

const initialState: SignInState = {
  signInFormValues: {
    email: "",
    password: "",
  },
};

export const SignInSlice = createSlice({
  name: "signIn",
  initialState,
  reducers: {
    saveSignInFormValues: (state, action: PayloadAction<SignInFormValues>) => {
      state.signInFormValues = action.payload;
    },
  },
});

export const { saveSignInFormValues } = SignInSlice.actions;

export const selectSignInFormValues = (state: RootState): SignInFormValues => state.signInState.signInFormValues;

export const signInReducer = SignInSlice.reducer;
