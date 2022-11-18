export interface CreatePaymentIntentRequest {
  planName: string;
  frequency: "monthly" | "yearly";
}
