import { Plan } from "./plan";

export interface CheckoutState {
  plan?: Plan;
  clientSecret?: string;
}
