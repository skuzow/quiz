import { Resend } from 'resend';
import type { User } from 'better-auth';

const { RESEND_API_KEY } = process.env;

const EMAIL_AUTHOR: string = 'skuzow/quiz <noreply@quiz.skuzow.com>';

const resend = new Resend(RESEND_API_KEY as string);

const sendVerificationEmail = async (user: User, url: string) => {
  await resend.emails.send({
    from: EMAIL_AUTHOR,
    to: [user.email],
    subject: 'Verify your skuzow/quiz account email address',
    html: `
    <p>Dear ${user.name},</p>
    <p>Click this link to verify your email address:</p>
    <p>${url}</p>
    <p>If you didn't perform this action please contact us at contact@quiz.skuzow.com</p>
    `
  });
};

const sendResetPassword = async (user: User, url: string) => {
  await resend.emails.send({
    from: EMAIL_AUTHOR,
    to: [user.email],
    subject: 'Reset your skuzow/quiz account password',
    html: `
    <p>Dear ${user.name},</p>
    <p>Click this link to reset your account password:</p>
    <p>${url}</p>
    <p>If you didn't perform this action please contact us at contact@quiz.skuzow.com</p>
    `
  });
};

const sendChangeEmailVerification = async (
  user: User,
  newEmail: string,
  url: string
) => {
  await resend.emails.send({
    from: EMAIL_AUTHOR,
    to: [user.email],
    subject: 'Change your skuzow/quiz account email address',
    html: `
    <p>Dear ${user.name},</p>
    <p>Click this link to change your account email address to (${newEmail}):</p>
    <p>${url}</p>
    <p>If you didn't perform this action please contact us at contact@quiz.skuzow.com</p>
    `
  });
};

const sendDeleteAccountVerification = async (user: User, url: string) => {
  await resend.emails.send({
    from: EMAIL_AUTHOR,
    to: [user.email],
    subject: 'Delete your skuzow/quiz account',
    html: `
    <p>Dear ${user.name},</p>
    <p>We are sorry to see you go :(</p>
    <p>Take in mind that this action is irreversible.</p>
    <p>Click this link to delete your account:</p>
    <p>${url}</p>
    <p>If you didn't perform this action please contact us at contact@quiz.skuzow.com</p>
    `
  });
};

export default {
  sendVerificationEmail,
  sendResetPassword,
  sendChangeEmailVerification,
  sendDeleteAccountVerification
};
