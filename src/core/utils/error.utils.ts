import { ValidationError } from "../types/validationError";

export const createErrorMessage = (
  errors: ValidationError[],
): { errorsMessages: ValidationError[] } => {
  return { errorsMessages: errors };
};
