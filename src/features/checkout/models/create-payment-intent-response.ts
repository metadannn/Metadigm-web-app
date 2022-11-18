import { CommonResponse } from "./../../../util/common-response";

export interface CreatePaymentIntentResponse extends CommonResponse {
  data: {
    clientSecret: string;
  };
}
