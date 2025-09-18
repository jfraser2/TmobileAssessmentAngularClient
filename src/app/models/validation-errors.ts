import {ValidationErrorDetail} from  './validation-error-detail';

export class ValidationErrors {
  requestStatus: string;
  timestamp: string;
  message: string;
  debugMessage: string;
  subErrors: ValidationErrorDetail[];
}
