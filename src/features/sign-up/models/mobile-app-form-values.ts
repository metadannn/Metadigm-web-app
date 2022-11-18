import { FieldValues } from "react-hook-form";

export interface MobileAppFormValues extends FieldValues {
  mobileEmail: string;
  mobilePassword: string;
  mobileConfirmPassword: string;
}
