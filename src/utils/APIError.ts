/**
 * Base class for all extendable errors
 */
export interface ExtendableErrorProps {
  message: string;
  errors?: any;
  status?: number;
  isPublic?: boolean;
  stack?: string | undefined;
  data?: any[] | any;
}

export class ExtendableError extends Error {
  public errors?: any;
  public status: number;
  public isPublic: boolean;
  public data?: any[];

  constructor({ message, errors, status = 500, isPublic = true, stack, data }: ExtendableErrorProps) {
    super(message);
    this.name = new.target.name;
    this.errors = errors;
    this.status = status;
    this.isPublic = isPublic;

    // Assign stack only if provided
    if (stack) {
      this.stack = stack;
    }

    // Ensure data is always an array if provided
    if (data !== undefined) {
      this.data = Array.isArray(data) ? data : [data];
    }
  }
}

/**
 * Class representing an API error.
 */
export interface APIErrorProps extends ExtendableErrorProps { }

export class APIError extends ExtendableError {
  constructor({ message, errors, status = 500, isPublic = true, stack, data }: APIErrorProps) {
    super({ message, errors, status, isPublic, stack, data });
  }
}
