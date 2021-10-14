import app from '../../src/server';

import supertest from 'supertest';
import { ProjectConfig } from '@mdrajibul/cloud-config-utils';

describe('MailController', () => {
  let request: any;

  beforeEach(() => {
    Object.defineProperty(ProjectConfig, 'configs', {
      get: jest.fn(() => {
        return {
          'port': '3002',
          'host': 'http://localhost',
          'openBrowser': false,
          'log.enable': false,
          'jwtToken': '3FF2EC019C627B945225DEBAD71A01B6985FE84C93170B0132882F88C0A5CB55',
          'mail.host': '127.0.0.1',
          'mail.port': '25',
          'mail.secure': false,
          'mail.auth.user': '',
          'mail.auth.pass': '',
        }
      }),
      configurable: true
    });
    request = supertest(app);
  });

  it('should send email', async () => {
    const res = await request.post('/api/mail/send')
      .set('Authorization', ProjectConfig.configs.jwtToken)
      .send({
        from: "test@email.com",
        to: "test@email.com",
        subject: "Test email",
        body: "Test email"
      });
    expect(res.statusCode).toEqual(200);
    expect(res.text).toEqual('Email sent successfully');
  })

  it('shouldn\'t send email when email address is invalid', async () => {
    const res = await request.post('/api/mail/send')
      .set('Authorization', ProjectConfig.configs.jwtToken)
      .send({
        from: "te@st@email.com",
        to: "te@st@email.com",
        subject: "Test email",
        body: "Test email"
      });
    expect(res.statusCode).toEqual(400);
    expect(res.error.message).not.toBeNull();
  })

  it('shouldn\'t send email when email secure option set true', async () => {

    Object.defineProperty(ProjectConfig, 'configs', {
      get: jest.fn(() => {
        return {
          'port': '3002',
          'host': 'http://localhost',
          'openBrowser': false,
          'log.enable': false,
          'jwtToken': '3FF2EC019C627B945225DEBAD71A01B6985FE84C93170B0132882F88C0A5CB55',
          'mail.host': '127.0.0.1',
          'mail.port': '25',
          'mail.secure': true
        }
      }),
      configurable: true
    });
    const request = supertest(app);

    const res = await request.post('/api/mail/send')
      .set('Authorization', ProjectConfig.configs.jwtToken)
      .send({
        from: "test@email.com",
        to: "test@email.com",
        subject: "Test email",
        body: "Test email"
      });
    expect(res.statusCode).toEqual(400);
    expect(res.error).not.toBeNull();
  })

  it('shouldn\'t send email when fields are empty', async () => {
    const res = await request.post('/api/mail/send')
      .set('Authorization', ProjectConfig.configs.jwtToken)
      .send({
        from: "",
        to: "",
        subject: "",
        body: ""
      });
    expect(res.statusCode).toEqual(400);
    expect(res.error.message).not.toBeNull();
  })

  it('should return 401', async () => {
    const res = await request.post('/api/mail/send')
      .send({
        from: "test@email.com",
        to: "test@email.com",
        subject: "Test email",
        body: "Test email"
      });
    expect(res.statusCode).toEqual(401);
    expect(res.text).toEqual('Token invalid');
  })
})