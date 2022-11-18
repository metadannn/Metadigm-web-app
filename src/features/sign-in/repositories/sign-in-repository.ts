import { AuthenticationError } from "./../../../util/errors";
import axios from "axios";
import { METADIGM_API_URL } from "../../../util/constants";
import { SignInRequest } from "./../../sign-in/models/sign-in-request";
import { SignInResponse } from "./../../sign-in/models/sign-in-response";

const authenticationApi = axios.create({
  baseURL: `${METADIGM_API_URL}/user`,
});

export async function signIn(input: SignInRequest): Promise<SignInResponse> {
  const response = await authenticationApi.put<SignInResponse>("/", input, { withCredentials: true });

  const authFailed = !response.data.isAuth;

  if (authFailed) {
    throw new AuthenticationError();
  }

  return response.data;
}
