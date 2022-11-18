import { FieldValues } from "react-hook-form";

export interface SignInFormValues extends FieldValues {
  email: string;
  password: string;
}
