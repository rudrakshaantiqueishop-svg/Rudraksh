import "server-only";
import { Resend } from "resend";

let resend: Resend | undefined;

function getResend() {
  if (!resend) {
    resend = new Resend(process.env.RESEND_API_KEY);
  }
  return resend;
}

const appUrl = process.env.AUTH_URL ?? "http://localhost:3000";

// Domain specific senders read from environment variables
export const NOREPLY_SENDER = process.env.EMAIL_FROM_NOREPLY ?? "Rudraksh Antiquei <noreply@rudrakshaantiquei.com>";
export const ORDERS_SENDER = process.env.EMAIL_FROM_ORDERS ?? "Rudraksh Antiquei <orders@rudrakshaantiquei.com>";
export const HELLO_SENDER = process.env.EMAIL_FROM_HELLO ?? "Rudraksh Antiquei <hello@rudrakshaantiquei.com>";

export async function sendVerificationEmail(email: string, token: string) {
  const url = `${appUrl}/verify-email?token=${token}`;

  if (!process.env.RESEND_API_KEY) {
    console.log(`[email] Verification link for ${email}: ${url}`);
    return;
  }

  await getResend().emails.send({
    from: NOREPLY_SENDER,
    to: email,
    subject: "Verify your email — Rudraksh Antiquei",
    html: `
      <p>Welcome to Rudraksh Antiquei!</p>
      <p>Please confirm your email address by clicking the link below:</p>
      <p><a href="${url}">Verify my email</a></p>
      <p>This link will expire in 24 hours. If you didn't create an account, you can ignore this email.</p>
    `,
  });
}

export async function sendLoginOtpEmail(email: string, code: string) {
  if (!process.env.RESEND_API_KEY) {
    console.log(`[email] Sign-in code for ${email}: ${code}`);
    return;
  }

  await getResend().emails.send({
    from: NOREPLY_SENDER,
    to: email,
    subject: "Your Rudraksh Antiquei sign-in code",
    html: `
      <p>Use the code below to sign in to Rudraksh Antiquei:</p>
      <p style="font-size: 28px; font-weight: bold; letter-spacing: 4px;">${code}</p>
      <p>This code will expire in 10 minutes. If you didn't request this, you can safely ignore this email.</p>
    `,
  });
}

export async function sendPasswordResetEmail(email: string, token: string) {
  const url = `${appUrl}/reset-password?token=${token}`;

  if (!process.env.RESEND_API_KEY) {
    console.log(`[email] Password reset link for ${email}: ${url}`);
    return;
  }

  await getResend().emails.send({
    from: NOREPLY_SENDER,
    to: email,
    subject: "Reset your password — Rudraksh Antiquei",
    html: `
      <p>We received a request to reset your Rudraksh Antiquei account password.</p>
      <p><a href="${url}">Reset my password</a></p>
      <p>This link will expire in 1 hour. If you didn't request this, you can safely ignore this email.</p>
    `,
  });
}

export async function sendOrderConfirmationEmail(email: string, orderDetails: { orderId: string; totalAmount: string }) {
  if (!process.env.RESEND_API_KEY) {
    console.log(`[email] Order confirmation for ${email}: Order #${orderDetails.orderId}, Total: ${orderDetails.totalAmount}`);
    return;
  }

  await getResend().emails.send({
    from: ORDERS_SENDER,
    to: email,
    subject: `Order Confirmation #${orderDetails.orderId} — Rudraksh Antiquei`,
    html: `
      <h2>Thank you for your order!</h2>
      <p>Your order #${orderDetails.orderId} has been successfully received and is being processed.</p>
      <p>Total amount paid: <strong>${orderDetails.totalAmount}</strong></p>
      <p>We will email you the tracking details as soon as your items ship.</p>
    `,
  });
}

export async function sendNewsletterEmail(email: string, newsletterDetails: { title: string; htmlContent: string }) {
  if (!process.env.RESEND_API_KEY) {
    console.log(`[email] Newsletter/Update to ${email}: ${newsletterDetails.title}`);
    return;
  }

  await getResend().emails.send({
    from: HELLO_SENDER,
    to: email,
    subject: newsletterDetails.title,
    html: newsletterDetails.htmlContent,
  });
}

export async function sendBroadcastEmail(emails: string[], broadcastDetails: { subject: string; htmlContent: string }) {
  if (!process.env.RESEND_API_KEY) {
    console.log(`[email] Broadcast to [${emails.join(", ")}]: ${broadcastDetails.subject}`);
    return;
  }

  // Resend supports sending to multiple recipients (up to 50 at a time per API call)
  // or sending to a list. We can batch them or send to all using the "to" field as an array
  await getResend().emails.send({
    from: HELLO_SENDER,
    to: emails,
    subject: broadcastDetails.subject,
    html: broadcastDetails.htmlContent,
  });
}

export async function sendAbandonedCartEmail(
  email: string,
  userName: string,
  cartItems: { name: string; price: string; imageUrl?: string }[]
) {
  if (!process.env.RESEND_API_KEY) {
    console.log(`[email] Cart abandonment email to ${email} for user ${userName}`);
    return;
  }

  const cartItemsMarkup = cartItems
    .map(
      (item) => `
      <div style="display: flex; align-items: center; margin-bottom: 16px;">
        ${
          item.imageUrl
            ? `<img src="${item.imageUrl}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px; margin-right: 16px; border: 1px solid #E7DFD6;" />`
            : `<div style="width: 50px; height: 50px; background-color: #FEF9F2; border-radius: 4px; margin-right: 16px; border: 1px solid #E7DFD6;"></div>`
        }
        <div style="margin-left: 12px;">
          <h4 style="margin: 0; font-size: 14px; color: #44403C;">${item.name}</h4>
          <p style="margin: 4px 0 0 0; font-size: 13px; font-weight: bold; color: #BB5A28;">${item.price}</p>
        </div>
      </div>
    `
    )
    .join("");

  await getResend().emails.send({
    from: NOREPLY_SENDER,
    to: email,
    subject: "You left something sacred in your cart",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #E7DFD6; padding: 30px; background-color: #FEF9F2; color: #44403C;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #552912; font-size: 24px; margin: 0 0 10px 0;">Rudraksh Antiquei</h1>
          <p style="font-size: 14px; color: #78716C; margin: 0; letter-spacing: 0.08em; text-transform: uppercase;">Sacred & Authentic Beads</p>
        </div>
        <div style="background: #FFFFFF; border-radius: 8px; padding: 24px; border: 1px solid #E7DFD6;">
          <h2 style="color: #552912; font-size: 20px; margin-top: 0;">Did you forget something, ${userName}?</h2>
          <p style="font-size: 15px; line-height: 1.6; color: #57534E;">We noticed you left some beautiful items in your cart. These authentic, energised treasures are waiting to bring positive energy and alignment to your life.</p>
          
          <div style="margin: 24px 0; border-top: 1px solid #E7DFD6; border-bottom: 1px solid #E7DFD6; padding: 16px 0;">
            <p style="font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.05em; color: #78716C; margin: 0 0 12px 0;">Items in your cart:</p>
            ${cartItemsMarkup}
          </div>
          
          <div style="text-align: center; margin-top: 30px;">
            <a href="${appUrl}/cart" style="display: inline-block; background-color: #552912; color: #FFFFFF; font-size: 16px; font-weight: bold; text-decoration: none; padding: 14px 32px; letter-spacing: 0.05em; text-transform: uppercase;">Complete Checkout</a>
          </div>
        </div>
        <div style="text-align: center; margin-top: 30px; font-size: 12px; color: #78716C;">
          <p style="margin: 0 0 8px 0;">Need help with your order? Reply to this email or contact us.</p>
          <p style="margin: 0;">© ${new Date().getFullYear()} Rudraksh Antiquei. All rights reserved.</p>
        </div>
      </div>
    `,
  });
}
