import { GraphQLError } from "graphql";

export type ErrorCode =
  | "INTERNAL_SERVER_ERROR"
  | "NOT_FOUND_ERROR"
  | "INPUT_ERROR"
  | "AUTHENTICATION_ERROR";

export class BaseError extends Error {}
export class InternalServerError extends BaseError {}
export class NotFoundError extends BaseError {}
export class InputError extends BaseError {}
export class AuthenticationError extends BaseError {}
export class UnknownError extends BaseError {}

export const toError = (error: GraphQLError): BaseError => {
  switch (error?.extensions?.code) {
    case "INTERNAL_SERVER_ERROR":
      return new InternalServerError();
    case "NOT_FOUND_ERROR":
      return new NotFoundError();
    case "INPUT_ERROR":
      return new InputError();
    case "AUTHENTICATION_ERROR":
      return new AuthenticationError();
    default:
      return new UnknownError();
  }
};

export const isNotFoundError = (e): boolean => {
  return e instanceof NotFoundError;
};
