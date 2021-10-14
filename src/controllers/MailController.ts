import { Request, Response } from 'express';
import MailDomain from '../domains/MailDomain';
import { IMail } from '../interfaces/mail';
import Log from '../utils/log';
import sendMail from '../utils/mail';
import ValidationError from '../utils/validationError';
import SecureBaseController from './SecureBaseController';

export default class MailController extends SecureBaseController {
  constructor(req: Request, res: Response) {
    super(req, res);
  }

  async send() {
    const mailObject: IMail = this.req.body;
    const mailDomain = new MailDomain(mailObject);
    const validateResult = mailDomain.validate();

    if (validateResult === true) {
      sendMail(mailDomain.from, mailDomain.to, mailDomain.subject, mailDomain.body)
        .then(data => {
          Log.log(
            `Email sent successfully. Details:: From: ${mailDomain.to} To: ${mailDomain.to}, Subject: ${mailDomain.subject}`
          );
          this.res.status(200).send('Email sent successfully');
        })
        .catch(error => {
          Log.error(
            `Email not sent. Details:: From: ${mailDomain.to} To: ${mailDomain.to}, Subject: ${mailDomain.subject}`
          );
          this.res.status(400).send(error);
        });
    } else {
      this.res.status(400).send(new ValidationError(String(validateResult)));
    }
  }
}
