export interface CommonResponse {
  code: string;
  message: string;
}

export const ResponseCodes = {
  SUCCESS: "meta-0001",
  UNEXPECTED_ERROR: "meta-0002",
  INVALID_INPUT: "meta-0003",
  EMAIL_IN_USE: "meta-0004",
  RESOURCE_NOT_FOUND: "meta-0005",
};
