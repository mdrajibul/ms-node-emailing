
import sendMail from "../../src/utils/mail";
import nodemailer from 'nodemailer';
import Log from "../../src/utils/log";
import { ProjectConfig } from "@mdrajibul/cloud-config-utils";

const projectConfigFn = jest.fn();

jest.mock('nodemailer', () => ({
    createTransport: jest.fn().mockReturnValue({
        verify: jest.fn(),
        sendMail: jest.fn()
    })
}));

describe('Mail util', () => {

    let createTransportSpy: any, verifySpy: any, sendMailSpy: any, logSpy: any;

    const transport = nodemailer.createTransport();

    beforeEach(() => {

        Object.defineProperty(ProjectConfig, 'configs', {
            get: jest.fn(() => {
                return {
                    'mail.host': '127.0.0.1',
                    'mail.port': '25',
                    'mail.secure': true,
                    'mail.auth.user': 'test',
                    'mail.auth.pass': 'test',
                }
            }),
            configurable: true
        });

        createTransportSpy = jest.spyOn(nodemailer, 'createTransport');
        verifySpy = jest.spyOn(transport, 'verify');
        sendMailSpy = jest.spyOn(transport, 'sendMail');
        logSpy = jest.spyOn(Log, 'error');
    });

    afterEach(() => {
        jest.clearAllMocks();
    })

    test('Sent email successfully', async () => {

        nodemailer.createTransport().verify.mockImplementation((callback: (arg0: any, arg1: boolean) => void) => {
            callback(null, true);
        });
        nodemailer.createTransport().sendMail.mockImplementation((mail: any, callback: (arg0: any, arg1: string) => void) => {
            callback(null, 'Successful');
        });

        sendMail('from@example.com', 'to@example.com', 'Test email', 'Test email').then(data => {
            expect(createTransportSpy).toHaveBeenCalled();
            expect(verifySpy).toHaveBeenCalled();
            expect(sendMailSpy).toHaveBeenCalled();
            expect(data).toBe('Successful');
        });

    });


    test('Sent email successfully when config properties not provided', async () => {

        Object.defineProperty(ProjectConfig, 'configs', {
            get: jest.fn(() => {
                return {
                    'mail.host': '127.0.0.1',
                    'mail.port': '25'
                }
            })
        });

        nodemailer.createTransport().verify.mockImplementation((callback: (arg0: any, arg1: boolean) => void) => {
            callback(null, true);
        });
        nodemailer.createTransport().sendMail.mockImplementation((mail: any, callback: (arg0: any, arg1: string) => void) => {
            callback(null, 'Successful');
        });

        sendMail('from@example.com', 'to@example.com', 'Test email', 'Test email').then(data => {
            expect(createTransportSpy).toHaveBeenCalled();
            expect(verifySpy).toHaveBeenCalled();
            expect(sendMailSpy).toHaveBeenCalled();
            expect(data).toBe('Successful');
        });

    });

    test('Email not sent when transport verify failed', async () => {

        nodemailer.createTransport().verify.mockImplementation((callback: (arg0: any, arg1: boolean) => void) => {
            callback({ message: 'Invalid port' }, false);
        });

        sendMail('from@example.com', 'to@example.com', 'Test email', 'Test email').catch(error => {
            expect(createTransportSpy).toHaveBeenCalled();
            expect(verifySpy).toHaveBeenCalled();
            expect(logSpy).toHaveBeenCalled();
            expect(sendMailSpy).not.toHaveBeenCalled();
            expect(error.message).toBe('Invalid port');
        });

    });

    test('Email not sent when transport sendMail failed', async () => {
        nodemailer.createTransport().verify.mockImplementation((callback: (arg0: any, arg1: boolean) => void) => {
            callback(null, true);
        });
        nodemailer.createTransport().sendMail.mockImplementation((mail: any, callback: (arg0: any, arg1: string) => void) => {
            callback({ message: 'To email address is not valid' }, 'unsuccessful');
        });

        sendMail('from@example.com', 'to@example.com', 'Test email', 'Test email').catch(error => {
            expect(createTransportSpy).toHaveBeenCalled();
            expect(verifySpy).toHaveBeenCalled();
            expect(logSpy).toHaveBeenCalled();
            expect(sendMailSpy).toHaveBeenCalled();
            expect(error.message).toBe('To email address is not valid');
        });

    });

})
