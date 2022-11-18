import * as yup from "yup";

export const signInFormSchema = yup.object().shape({
  email: yup.string().email("Please enter a valid email address").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must have at least 8 characters")
    .max(32, "Password cannot have more than 32 characters")
    .required("Password is required"),
});
