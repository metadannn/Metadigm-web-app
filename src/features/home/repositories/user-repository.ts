import { GetUserPlanResponse } from "../models/get-user-plan-response";
import axios, { AxiosError } from "axios";
import { METADIGM_API_URL } from "../../../util/constants";
import { ResponseCodes } from "../../../util/common-response";
import { UnexpectedError, UserPlanIsRequiredError } from "../../../util/errors";

const usersApi = axios.create({
  baseURL: `${METADIGM_API_URL}/user`,
  withCredentials: true,
});

export async function getUserPlan(): Promise<GetUserPlanResponse> {
  try {
    const response = await usersApi.get<GetUserPlanResponse>("/me/plan");

    return response.data;
  } catch (error) {
    console.error("An error occurred processing the get user plan request.", error);

    if (error instanceof AxiosError && error?.response?.data?.code === ResponseCodes.RESOURCE_NOT_FOUND) {
      throw new UserPlanIsRequiredError();
    }

    throw new UnexpectedError();
  }
}

export async function logout(): Promise<void> {
  try {
    await usersApi.patch("/");
  } catch (error) {
    console.error("An error occurred logging out.", error);

    throw new UnexpectedError();
  }
}
export async function setStarterPlan(): Promise<void> {
  try {
    await usersApi.put("/me/plan/starter");
  } catch (error) {
    console.error("An error occurred setting starter plan.", error);

    throw new UnexpectedError();
  }
}
