import { FieldValues } from "react-hook-form";

export interface AccountFormValues extends FieldValues {
  email: string;
  password: string;
  confirmPassword: string;
}
