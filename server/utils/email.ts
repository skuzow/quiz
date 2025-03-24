import { Resend } from 'resend';
import type { User } from 'better-auth';

const { RESEND_API_KEY } = process.env;

const EMAIL_AUTHOR: string = 'skuzow/quiz <noreply@quiz.skuzow.com>';

const resend = new Resend(RESEND_API_KEY as string);

const sendVerificationEmail = async (user: User, url: string) => {
  await resend.emails.send({
    from: EMAIL_AUTHOR,
    to: [user.email],
    subject: 'Verify your skuzow/quiz account',
    html: `
    <p>Welcome!</p>
    <p>You have successfully created a skuzow/quiz account.</p>
    <p>Please verify your email address and complete your registration clicking this link: ${url}</p>
    <p>If you didn't create this account please contact us at contact@quiz.skuzow.com</p>
    `
  });
};

export default {
  sendVerificationEmail
};
