import { Resend } from "resend";
import bcrypt from "bcrypt";
import { env } from "$env/dynamic/private";
import { createVerificationToken } from "$lib/server/db/repositories/verification-token.repository";

const resend = new Resend(env.RESEND_API_KEY);

export async function sendVerificationEmail(email: string) {
  const token = bcrypt.hashSync(email + Date.now(), 10);

  await createVerificationToken(email, token);

  const verifyUrl = `${env.AUTH_URL}/api/verify-email?token=${token}&email=${email}`;

  await resend.emails.send({
    from: "SiFreelance <adamsetiadi12345@adamstd.my.id>",
    to: email,
    subject: "Verify your email",
    html: `
      <h2>Email Verification</h2>
      <p>Click link below to verify your account:</p>
      <a href="${verifyUrl}">${verifyUrl}</a>
    `,
  });

}
