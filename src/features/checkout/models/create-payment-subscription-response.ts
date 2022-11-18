import { CommonResponse } from "../../../util/common-response";

export interface CreatePaymentSubscriptionResponse extends CommonResponse {
  data: {
    subscriptionId: string;
    clientSecret: string;
  };
}
