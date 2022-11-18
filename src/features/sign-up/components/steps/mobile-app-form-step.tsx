import { yupResolver } from "@hookform/resolvers/yup";
import CloseIcon from "@mui/icons-material/Close";
import { Alert, Box, Button, IconButton, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import * as yup from "yup";
import { MetaMainTextField } from "../../../../components/text-fields/main/meta-main-text-field";
import { useAppDispatch, useAppSelector } from "../../../../configurations/hooks";
import { UNEXPECTED_ERROR_MESSAGE } from "../../../../util/constants";
import { OneOrMoreEmailsInUseError } from "../../../../util/errors";
import { synchronizeEventFn } from "../../../../util/syncronize-event-fn";
import { signIn } from "../../../sign-in/repositories/sign-in-repository";
import { MobileAppFormValues } from "../../models/mobile-app-form-values";
import { signUp } from "../../repositories/sign-up-repository";
import {
  previousStep,
  saveMobileAppFormValues,
  selectAccountFormValues,
  selectBusinessFormValues,
  selectMobileAppFormValues,
} from "../../slices/sign-up-slice";

const formSchema = yup.object().shape({
  mobileEmail: yup.string().email("Please enter a valid email address").required("Email is required"),
  mobilePassword: yup
    .string()
    .min(8, "Password must have at least 8 characters")
    .max(32, "Password cannot have more than 32 characters")
    .required("Password is required"),
  mobileConfirmPassword: yup
    .string()
    .oneOf([yup.ref("mobilePassword")], "Passwords must match")
    .required("Please confirm your password"),
});

export function MobileAppFormStep(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const accountFormValues = useAppSelector(selectAccountFormValues);
  const businessFormValues = useAppSelector(selectBusinessFormValues);

  const formDefaultValues = useAppSelector(selectMobileAppFormValues);

  const { control, handleSubmit } = useForm<MobileAppFormValues>({
    defaultValues: formDefaultValues,
    resolver: yupResolver(formSchema),
  });

  const [signUpMessage, setSignUpMessage] = useState<string | null>(null);

  const signInMutationController = useMutation({
    mutationFn: signIn,
    onSuccess: () => {
      navigate("/home");
    },
  });

  const signUpMutationController = useMutation({
    mutationFn: signUp,
    onMutate: () => {
      setSignUpMessage(null);
    },
    onSuccess: () => {
      signInMutationController.mutate({
        email: accountFormValues.email,
        password: accountFormValues.password,
      });
    },
    onError: (error) => {
      if (error instanceof OneOrMoreEmailsInUseError) {
        setSignUpMessage(error.message);
      } else {
        setSignUpMessage(UNEXPECTED_ERROR_MESSAGE);
      }
    },
  });

  const onSubmit = (mobileAppFormValues: MobileAppFormValues): void => {
    dispatch(saveMobileAppFormValues(mobileAppFormValues));
    signUpMutationController.mutate({
      email: accountFormValues.email,
      password: accountFormValues.password,
      businessName: businessFormValues.businessName,
      businessAddress: businessFormValues.streetAddress,
      businessCity: businessFormValues.city,
      businessState: businessFormValues.state,
      businessZipCode: businessFormValues.zipCode,
      businessPrimaryManagerName: businessFormValues.primaryManagerName,
      mobileAppLogin: {
        email: mobileAppFormValues.mobileEmail,
        password: mobileAppFormValues.mobilePassword,
      },
    });
  };

  const syncHandleSubmit = synchronizeEventFn(handleSubmit(onSubmit));

  return (
    <Stack spacing={3}>
      <Typography variant="subtitle1">Mobile app login</Typography>
      <Typography variant="body1">
        None of this info will be shared publicly. Please submit informtion of the manager/owner who will serve as the
        primary contact for the business and Metadigm.
      </Typography>

      {signUpMessage != null && (
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setSignUpMessage(null);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          <Typography variant="body1">{signUpMessage}</Typography>
        </Alert>
      )}

      <MetaMainTextField
        name="mobileEmail"
        control={control}
        label="Mobile app login email"
        required
        disabled={signUpMutationController.isLoading || signInMutationController.isLoading}
      />
      <MetaMainTextField
        name="mobilePassword"
        control={control}
        label="Mobile app login password"
        required
        type="password"
        disabled={signUpMutationController.isLoading || signInMutationController.isLoading}
      />
      <MetaMainTextField
        name="mobileConfirmPassword"
        control={control}
        label="Confirm password"
        required
        type="password"
        disabled={signUpMutationController.isLoading || signInMutationController.isLoading}
      />
      <Stack direction="row" justifyContent="end" spacing={2} mt={"2rem"}>
        <Button
          onClick={() => dispatch(previousStep())}
          disabled={signUpMutationController.isLoading || signInMutationController.isLoading}
        >
          Back
        </Button>
        <Button
          variant="contained"
          onClick={syncHandleSubmit}
          disabled={signUpMutationController.isLoading || signInMutationController.isLoading}
        >
          {signUpMutationController.isLoading || signInMutationController.isLoading ? (
            <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "baseline" }}>
              {signUpMutationController.isLoading ? "CREATING ACCOUNT" : "LOGGING IN"}
              <BeatLoader size={5} color="grey" />
            </Box>
          ) : (
            "CREATE ACCOUNT"
          )}
        </Button>
      </Stack>
    </Stack>
  );
}
