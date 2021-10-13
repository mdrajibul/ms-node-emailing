import { ProjectConfig } from '@mdrajibul/cloud-config-utils';
import nodemailer from 'nodemailer';

/**
 * A util function to send email using Nodemailer
 * @param from - Email address of sender
 * @param to - Email address of receiver
 * @param subject - Email subject line
 * @param text - Body of the emaul
 * @returns Promise
 */
const sendMail = (from: string, to: string, subject: string, text: string): Promise<any> => {
  const transport: any = {
    host: ProjectConfig.configs['mail.host'],
    port: ProjectConfig.configs['mail.port']
  };
  if (ProjectConfig.configs['mail.secure']) {
    transport.secure = ProjectConfig.configs['mail.secure'];
  }

  if (ProjectConfig.configs['mail.auth.user']) {
    transport.auth.user = ProjectConfig.configs['mail.auth.user'];
    transport.auth.pass = ProjectConfig.configs['mail.auth.pass'];
  }

  const transporter = nodemailer.createTransport(transport);

  return new Promise((resolve, reject) => {
    transporter.verify((error: any, success: any) => {
      if (error) {
        reject(error);
      } else {
        const mail = {
          from,
          to,
          subject,
          text
        };
        transporter.sendMail(mail, (err: any, data: any) => {
          if (!error) {
            resolve(data);
          } else {
            reject(error);
          }
        });
      }
    });
  });
};

export default sendMail;
