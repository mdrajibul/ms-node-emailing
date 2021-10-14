import { IMail } from '../interfaces/mail';
import { IDomainValidation } from '../interfaces/validationDomain';
import { isValidEmail, trim } from '../utils/common';
import ValidationError from '../utils/validationError';

export default class MailDomain implements IDomainValidation {
  from: string;
  to: string;
  subject: string;
  body: string;

  constructor(data: IMail) {
    this.from = trim(data.from);
    this.to = trim(data.to);
    this.subject = trim(data.subject);
    this.body = trim(data.body);
  }

  validate(): boolean | string {
    const errors = [];
    if (!this.from) {
      errors.push('From email is required');
    }
    if (!this.to) {
      errors.push('To email is required');
    }
    if (!this.subject) {
      errors.push('Subject is required');
    }
    if (this.from && !isValidEmail(this.from)) {
      errors.push('From email is not valid');
    }
    if (this.to && !isValidEmail(this.to)) {
      errors.push('To email is not valid');
    }
    if (errors.length) {
      return JSON.stringify(errors);
    }
    return true;
  }
}
