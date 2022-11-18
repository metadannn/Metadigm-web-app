import { yupResolver } from "@hookform/resolvers/yup";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { MetaMainTextField } from "../../../../components/text-fields/main/meta-main-text-field";
import { useAppDispatch, useAppSelector } from "../../../../configurations/hooks";
import { synchronizeEventFn } from "../../../../util/syncronize-event-fn";
import { AccountFormValues } from "../../models/account-form-values";
import { nextStep, saveAccountFormValues, selectAccountFormValues } from "../../slices/sign-up-slice";

const formSchema = yup.object().shape({
  email: yup.string().email("Please enter a valid email address").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must have at least 8 characters")
    .max(32, "Password cannot have more than 32 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});

export function AccountFormStep(): JSX.Element {
  const dispatch = useAppDispatch();

  const formDefaultValues = useAppSelector(selectAccountFormValues);

  const { control, handleSubmit } = useForm<AccountFormValues>({
    defaultValues: formDefaultValues,
    resolver: yupResolver(formSchema),
  });

  const onSubmit = (accountFormValues: AccountFormValues): void => {
    dispatch(saveAccountFormValues(accountFormValues));
    dispatch(nextStep());
  };

  const syncHandleSubmit = synchronizeEventFn(handleSubmit(onSubmit));

  return (
    <Stack spacing={3}>
      <Typography variant="subtitle1">Enter your email</Typography>
      <Typography variant="body1" color="text.secondary">
        This email will be used to log in here to the Merchant Portal and for all major communications. You will
        configure the login email and password for the Mobile App on the next screens.
      </Typography>

      <MetaMainTextField name="email" control={control} label="Email" />
      <MetaMainTextField name="password" control={control} label="Password " type="password" />
      <MetaMainTextField name="confirmPassword" control={control} label="Confirm password" type="password" />

      <Stack direction="row" justifyContent="end" spacing={2} mt={"2rem"}>
        <Button variant="contained" onClick={syncHandleSubmit}>
          Next
        </Button>
      </Stack>
    </Stack>
  );
}
