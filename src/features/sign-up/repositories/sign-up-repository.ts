import axios, { AxiosError } from "axios";
import { METADIGM_API_URL } from "../../../util/constants";
import { SignUpRequest } from "../models/sign-up-request";
import { SignUpResponse } from "../models/sign-up-response";
import { ResponseCodes } from "./../../../util/common-response";
import { OneOrMoreEmailsInUseError, UnexpectedError } from "./../../../util/errors";

const usersApi = axios.create({
  baseURL: `${METADIGM_API_URL}/user`,
});

export async function signUp(input: SignUpRequest): Promise<SignUpResponse> {
  try {
    const response = await usersApi.post<SignUpResponse>("/", input);

    return response.data;
  } catch (error) {
    console.error("An error occurred processing the create user request.", error);

    if (error instanceof AxiosError && error?.response?.data?.code === ResponseCodes.EMAIL_IN_USE) {
      const { data: emails } = error.response.data;
      throw new OneOrMoreEmailsInUseError(emails);
    }

    throw new UnexpectedError();
  }
}
