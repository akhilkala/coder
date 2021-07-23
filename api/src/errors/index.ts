export abstract class CustomError extends Error {
  abstract statusCode: number;
  constructor(error?: string) {
    super(error);
    Object.setPrototypeOf(this, CustomError.prototype);
  }
  abstract serializeError(): { message: string | any; field?: string }[];
}
