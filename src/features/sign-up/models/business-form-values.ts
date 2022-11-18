import { FieldValues } from "react-hook-form";

export interface BusinessFormValues extends FieldValues {
  businessName: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  primaryManagerName: string;
  agreeTerms: boolean;
}
