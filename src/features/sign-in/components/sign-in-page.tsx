import { yupResolver } from "@hookform/resolvers/yup";
import MuiAlert, { AlertColor, AlertProps } from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import logoImage from "../../../assets/img/metadigm-full-logo.svg";
import { MetaMainTextField } from "../../../components/text-fields/main/meta-main-text-field";
import { useAppDispatch, useAppSelector } from "../../../configurations/hooks";
import { UNEXPECTED_ERROR_MESSAGE } from "../../../util/constants";
import { AuthenticationError } from "../../../util/errors";
import { synchronizeEventFn } from "../../../util/syncronize-event-fn";
import { SignInFormValues } from "../models/sign-in-form-values";
import { signIn } from "../repositories/sign-in-repository";
import { signInFormSchema } from "../schemas/sign-in-form-schema";
import { saveSignInFormValues, selectSignInFormValues } from "../slices/sign-in-slice";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const PAGE_PATH = "/";

export function SignInPage(): JSX.Element {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: { xs: "center", md: "space-evenly" },
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <SignInCard />
      <Logo />
    </Box>
  );
}

const snackbarDefaultState = {
  isOpen: false,
  message: "",
  severity: "",
};

function SignInCard(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [snackbarState, setSnackbarState] = useState(snackbarDefaultState);

  const signInFormValues = useAppSelector(selectSignInFormValues);
  const { control, handleSubmit, getValues } = useForm<SignInFormValues>({
    defaultValues: signInFormValues,
    resolver: yupResolver(signInFormSchema),
  });

  const signInMutationController = useMutation({
    mutationFn: signIn,
    onSuccess: () => {
      navigate("/home");
      setSnackbarState({ isOpen: true, message: "Success", severity: "success" });
    },
    onError: (error) => {
      let message;

      if (error instanceof AuthenticationError) {
        message = error.message;
      } else {
        message = UNEXPECTED_ERROR_MESSAGE;
      }

      setSnackbarState({ isOpen: true, message, severity: "error" });
    },
  });

  const onFormSubmit = (formValues: SignInFormValues): void => {
    if (snackbarState.isOpen) {
      setSnackbarState(snackbarDefaultState);
    }
    dispatch(saveSignInFormValues(formValues));
    signInMutationController.mutate(formValues);
  };

  const onSignInClick = synchronizeEventFn(handleSubmit(onFormSubmit));
  const onSignUpClick = (): void => {
    dispatch(saveSignInFormValues(getValues()));
    navigate("/sign-up");
  };

  const handleCloseSnackbar = (_event?: React.SyntheticEvent | Event, reason?: string): void => {
    if (reason === "clickaway") return;
    setSnackbarState(snackbarDefaultState);
  };

  return (
    <Card raised sx={{ p: 4, textAlign: "center", order: { xs: 1, md: 0 }, m: "2rem" }}>
      {snackbarState.severity !== "" ? (
        <Snackbar
          open={snackbarState.isOpen}
          autoHideDuration={4000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={handleCloseSnackbar} severity={snackbarState.severity as AlertColor} sx={{ width: "100%" }}>
            {snackbarState.message}
          </Alert>
        </Snackbar>
      ) : null}
      <Stack spacing={3}>
        <Typography variant="h5">Authentication</Typography>
        <Typography variant="body1">Input your email and password below to login</Typography>
        <MetaMainTextField
          name="email"
          control={control}
          label="Email"
          required
          disabled={signInMutationController.isLoading}
        />
        <MetaMainTextField
          name="password"
          control={control}
          label="Password"
          required
          type="password"
          disabled={signInMutationController.isLoading}
        />

        <Button variant="contained" disabled={signInMutationController.isLoading} onClick={onSignInClick}>
          {signInMutationController.isLoading ? (
            <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "baseline" }}>
              LOGGING IN
              <BeatLoader loading={signInMutationController.isLoading} size={5} color="grey" />
            </Box>
          ) : (
            "LOGIN"
          )}
        </Button>
        <Button variant="outlined" disabled={signInMutationController.isLoading} onClick={onSignUpClick}>
          SIGN UP
        </Button>
      </Stack>
    </Card>
  );
}

function Logo(): JSX.Element {
  return (
    <Box
      component="img"
      alt="Metadigm Logo"
      src={logoImage}
      sx={{
        width: {
          xs: "50%",
          md: "30%",
        },
      }}
    />
  );
}
