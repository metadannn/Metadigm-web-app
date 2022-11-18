import { Visibility, VisibilityOff } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { useState } from "react";
import { Controller, ControllerProps, FieldValues } from "react-hook-form";

const TEXT_TYPE = "text";
const PASSWORD_TYPE = "password";

type MetaMainTextFieldProps<F extends FieldValues> = Pick<ControllerProps<F>, "name" | "control"> &
  Pick<TextFieldProps, "label" | "variant" | "type" | "required" | "autoComplete" | "fullWidth" | "disabled">;

export function MetaMainTextField<F extends FieldValues>({
  name,
  control,
  label,
  variant,
  type: initialInputType = TEXT_TYPE,
  required,
  autoComplete,
  fullWidth,
  disabled,
}: MetaMainTextFieldProps<F>): JSX.Element {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        const [showPassword, setShowPassword] = useState(false);
        const handleClickShowPassword = (): void => setShowPassword(!showPassword);

        let inputType = initialInputType;
        let inputProps = {};

        if (initialInputType === PASSWORD_TYPE) {
          inputType = showPassword ? TEXT_TYPE : PASSWORD_TYPE;
          inputProps = {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowPassword} disabled={disabled}>
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          };
        }

        const hasError = error !== undefined && error !== null;

        return (
          <TextField
            label={label}
            variant={variant}
            onChange={onChange}
            value={value}
            error={hasError}
            helperText={error?.message}
            required={required}
            autoComplete={autoComplete}
            type={inputType}
            InputProps={inputProps}
            fullWidth={fullWidth}
            disabled={disabled}
          />
        );
      }}
    />
  );
}
