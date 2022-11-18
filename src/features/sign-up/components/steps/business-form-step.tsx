import { yupResolver } from "@hookform/resolvers/yup";
import { FormHelperText } from "@mui/material";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { MetaMainTextField } from "../../../../components/text-fields/main/meta-main-text-field";
import { useAppDispatch, useAppSelector } from "../../../../configurations/hooks";
import { synchronizeEventFn } from "../../../../util/syncronize-event-fn";
import { BusinessFormValues } from "../../models/business-form-values";
import { nextStep, previousStep, saveBusinessFormValues, selectBusinessFormValues } from "../../slices/sign-up-slice";

const formSchema = yup.object().shape({
  businessName: yup.string().required("Business name is required"),
  streetAddress: yup.string().required("Street address is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  zipCode: yup.number().typeError("Must be a number").min(10000, "Must have 5 digits").max(99999, "Must have 5 digits"),
  primaryManagerName: yup.string().required("Primary manager name is required"),
  agreeTerms: yup.boolean().oneOf([true], "You must agree with the terms of use in order to proceed"),
});

export function BusinessFormStep(): JSX.Element {
  const dispatch = useAppDispatch();

  const formDefaultValues = useAppSelector(selectBusinessFormValues);

  const { control, handleSubmit } = useForm<BusinessFormValues>({
    defaultValues: formDefaultValues,
    resolver: yupResolver(formSchema),
  });

  const onSubmit = (businessFormValues: BusinessFormValues): void => {
    dispatch(saveBusinessFormValues(businessFormValues));
    dispatch(nextStep());
  };

  const syncHandleSubmit = synchronizeEventFn(handleSubmit(onSubmit));

  return (
    <Stack spacing={3}>
      <Typography variant="subtitle1">Business data</Typography>
      <Typography variant="body1" color="text.secondary">
        Only your business’ name will be public.
      </Typography>

      <MetaMainTextField name="businessName" control={control} label="Business name" required />

      <Typography variant="body1" color="text.secondary">
        Input address of primary location where memberships will be scanned. Support for multiple locations coming soon.
      </Typography>

      <MetaMainTextField name="streetAddress" control={control} label="Street address" variant="outlined" required />

      <Stack sx={{ flexDirection: { xs: "column", md: "row" }, gap: 3 }}>
        <MetaMainTextField name="city" control={control} label="City" required fullWidth />
        <MetaMainTextField name="state" control={control} label="State" required fullWidth />
      </Stack>

      <MetaMainTextField name="zipCode" control={control} label="Zip code" required />
      <MetaMainTextField name="primaryManagerName" control={control} label="Primary manager name" required />

      <Controller
        name="agreeTerms"
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => {
          const hasError = error !== null && error !== undefined;

          let errorComponent: JSX.Element = <></>;
          if (hasError) {
            errorComponent = <FormHelperText>{error.message}</FormHelperText>;
          }

          return (
            <FormControl required error={hasError}>
              <FormControlLabel
                label="Agree with terms of use"
                control={<Checkbox onChange={onChange} value={value} checked={value} />}
              />
              {errorComponent}
            </FormControl>
          );
        }}
      />

      <Stack direction="row" justifyContent="end" spacing={2} mt={"2rem"}>
        <Button onClick={() => dispatch(previousStep())}>Back</Button>
        <Button variant="contained" onClick={syncHandleSubmit}>
          Next
        </Button>
      </Stack>
    </Stack>
  );
}
