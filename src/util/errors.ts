export class AuthenticationError extends Error {
  constructor(message: string = "Please verify your credentials and try again.") {
    super(message);
    this.name = "AuthenticationError";
  }
}

export class UnexpectedError extends Error {
  constructor(message: string = "Something went wrong.") {
    super(message);
    this.name = "UnexpectedError";
  }
}

export class OneOrMoreEmailsInUseError extends Error {
  constructor(emails: string[]) {
    const commaSeparatedEmails = emails.reduce((prev, curr) => `${prev}, ${curr}`);
    const message = `One or more emails in use: ${commaSeparatedEmails}`;
    super(message);
    this.name = "OneOrMoreEmailsInUseError";
  }
}

export class UserPlanIsRequiredError extends Error {
  constructor(message: string = "You must select a plan to start using Metadigm services.") {
    super(message);
    this.name = "UserPlanIsRequiredError";
  }
}
