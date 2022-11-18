import axios from "axios";
import { METADIGM_API_URL } from "../../../util/constants";
import { CreatePaymentIntentRequest } from "./../models/create-payment-intent-request";
import { CreatePaymentIntentResponse } from "./../models/create-payment-intent-response";

const paymentsApi = axios.create({
  baseURL: `${METADIGM_API_URL}/payments`,
  withCredentials: true,
});

export async function createPaymentIntent(input: CreatePaymentIntentRequest): Promise<CreatePaymentIntentResponse> {
  const response = await paymentsApi.post<CreatePaymentIntentResponse>("/intent", input);
  return response.data;
}

export async function createPaymentSubscription(
  input: CreatePaymentIntentRequest
): Promise<CreatePaymentIntentResponse> {
  const response = await paymentsApi.post<CreatePaymentIntentResponse>("/subscription", input);
  return response.data;
}
