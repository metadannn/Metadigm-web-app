import { CommonResponse } from "./../../../util/common-response";

export interface GetUserPlanResponse extends CommonResponse {
  data: {
    name: string;
    expirationTimestamp?: number;
  };
}
