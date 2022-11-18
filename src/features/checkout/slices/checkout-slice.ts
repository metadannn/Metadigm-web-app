import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../../configurations/store";
import { CheckoutState } from "../models/checkout-state";
import { Plan } from "./../models/plan";

const initialState: CheckoutState = {};

export const CheckoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setPlan: (state, action: PayloadAction<Plan>) => {
      state.plan = action.payload;
    },
    setClientSecret: (state, action: PayloadAction<string>) => {
      state.clientSecret = action.payload;
    },
  },
});

export const { setPlan, setClientSecret } = CheckoutSlice.actions;

export const selectPlan = (state: RootState): Plan | undefined => state.checkoutState.plan;
export const selectClientSecret = (state: RootState): string | undefined => state.checkoutState.clientSecret;

export const checkoutReducer = CheckoutSlice.reducer;
