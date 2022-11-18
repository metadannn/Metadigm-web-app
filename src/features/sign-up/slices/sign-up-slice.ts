import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../../configurations/store";
import { AccountFormValues } from "../models/account-form-values";
import { BusinessFormValues } from "../models/business-form-values";
import { MobileAppFormValues } from "../models/mobile-app-form-values";

interface SignUpState {
  currentStep: number;
  stepsCount: number;
  accountFormValues: AccountFormValues;
  businessFormValues: BusinessFormValues;
  mobileAppFormValues: MobileAppFormValues;
}

const initialState: SignUpState = {
  currentStep: 0,
  stepsCount: 3,
  accountFormValues: {
    email: "",
    password: "",
    confirmPassword: "",
  },
  businessFormValues: {
    businessName: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    primaryManagerName: "",
    agreeTerms: false,
  },
  mobileAppFormValues: {
    mobileEmail: "",
    mobilePassword: "",
    mobileConfirmPassword: "",
  },
};

export const SignUpSlice = createSlice({
  name: "signUp",
  initialState,
  reducers: {
    nextStep: (state) => {
      const lastIndex = state.stepsCount - 1;

      if (state.currentStep < lastIndex) {
        state.currentStep++;
      }
    },
    previousStep: (state) => {
      if (state.currentStep > 0) {
        state.currentStep--;
      }
    },
    saveAccountFormValues: (state, action: PayloadAction<AccountFormValues>) => {
      state.accountFormValues = action.payload;
    },
    saveBusinessFormValues: (state, action: PayloadAction<BusinessFormValues>) => {
      state.businessFormValues = action.payload;
    },
    saveMobileAppFormValues: (state, action: PayloadAction<MobileAppFormValues>) => {
      state.mobileAppFormValues = action.payload;
    },
  },
});

export const { nextStep, previousStep, saveAccountFormValues, saveBusinessFormValues, saveMobileAppFormValues } =
  SignUpSlice.actions;

export const selectCurrentStep = (state: RootState): number => state.signUpState.currentStep;
export const selectAccountFormValues = (state: RootState): AccountFormValues => state.signUpState.accountFormValues;
export const selectBusinessFormValues = (state: RootState): BusinessFormValues => state.signUpState.businessFormValues;
export const selectMobileAppFormValues = (state: RootState): MobileAppFormValues =>
  state.signUpState.mobileAppFormValues;

export const signUpReducer = SignUpSlice.reducer;
