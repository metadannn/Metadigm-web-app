import { configureStore } from "@reduxjs/toolkit";
import { checkoutReducer } from "../features/checkout/slices/checkout-slice";
import { signInReducer } from "../features/sign-in/slices/sign-in-slice";
import { signUpReducer } from "../features/sign-up/slices/sign-up-slice";

export const store = configureStore({
  reducer: {
    signUpState: signUpReducer,
    signInState: signInReducer,
    checkoutState: checkoutReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
