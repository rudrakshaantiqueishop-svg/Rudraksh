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

export type OrderConfirmationDetails = {
  orderId: string;
  orderNumber: string;
  customerName: string;
  placedOn: string;
  totalAmount: string;
  paymentReference?: string | null;
  items: {
    name: string;
    options?: string;
    quantity: number;
    lineTotal: string;
    imageUrl?: string;
  }[];
  address?: {
    fullName: string;
    line1: string;
    line2?: string | null;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    phone: string;
  } | null;
};

// Escapes values that come from the database (product names, addresses) before
// they are dropped into the email markup.
function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function sendOrderConfirmationEmail(email: string, order: OrderConfirmationDetails) {
  const trackUrl = `${appUrl}/account/orders/${order.orderId}`;

  if (!process.env.RESEND_API_KEY) {
    console.log(
      `[email] Order confirmation for ${email}: ${order.orderNumber}, ${order.totalAmount}, ${trackUrl}`
    );
    return;
  }

  // Tables, not flexbox — Outlook and several mobile clients ignore flex.
  const itemRows = order.items
    .map(
      (item) => `
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #EFE1CF; width: 64px; vertical-align: top;">
          ${
            item.imageUrl
              ? `<img src="${esc(item.imageUrl)}" alt="${esc(item.name)}" width="56" height="56" style="width:56px;height:56px;object-fit:cover;border-radius:6px;border:1px solid #EADFD1;display:block;" />`
              : `<div style="width:56px;height:56px;background-color:#F5EADF;border-radius:6px;border:1px solid #EADFD1;"></div>`
          }
        </td>
        <td style="padding: 12px 12px; border-bottom: 1px solid #EFE1CF; vertical-align: top;">
          <div style="font-size:14px;color:#0B0404;font-weight:600;">${esc(item.name)}</div>
          ${item.options ? `<div style="font-size:12px;color:#8B7355;margin-top:3px;">${esc(item.options)}</div>` : ""}
          <div style="font-size:12px;color:#8B7355;margin-top:3px;">Qty: ${item.quantity}</div>
        </td>
        <td style="padding: 12px 0; border-bottom: 1px solid #EFE1CF; text-align: right; vertical-align: top; white-space: nowrap;">
          <span style="font-size:14px;font-weight:bold;color:#0B0404;">${esc(item.lineTotal)}</span>
        </td>
      </tr>`
    )
    .join("");

  const addressBlock = order.address
    ? `
      <div style="margin-top:24px;padding:16px;background-color:#FDF6ED;border:1px solid #EADFD1;border-radius:8px;">
        <p style="margin:0 0 8px 0;font-size:12px;font-weight:bold;text-transform:uppercase;letter-spacing:0.05em;color:#8B7355;">Delivering to</p>
        <p style="margin:0;font-size:14px;line-height:1.6;color:#44403C;">
          <strong style="color:#0B0404;">${esc(order.address.fullName)}</strong><br />
          ${esc(order.address.line1)}${order.address.line2 ? `, ${esc(order.address.line2)}` : ""}<br />
          ${esc(order.address.city)}, ${esc(order.address.state)} ${esc(order.address.postalCode)}<br />
          ${esc(order.address.country)}<br />
          ${esc(order.address.phone)}
        </p>
      </div>`
    : "";

  const plainText = [
    `Thank you for your order, ${order.customerName}!`,
    ``,
    `Order ${order.orderNumber} — placed ${order.placedOn}`,
    `Total paid: ${order.totalAmount}`,
    ``,
    ...order.items.map(
      (i) => `- ${i.name}${i.options ? ` (${i.options})` : ""} x${i.quantity} — ${i.lineTotal}`
    ),
    ``,
    `Track your order: ${trackUrl}`,
  ].join("\n");

  await getResend().emails.send({
    from: ORDERS_SENDER,
    to: email,
    subject: `Order ${order.orderNumber} confirmed — Rudraksh Antiquei`,
    text: plainText,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #FEF9F2; color: #44403C; padding: 30px;">
        <div style="text-align:center;margin-bottom:28px;">
          <h1 style="color:#552912;font-size:24px;margin:0 0 6px 0;">Rudraksh Antiquei</h1>
          <p style="font-size:12px;color:#8B7355;margin:0;letter-spacing:0.08em;text-transform:uppercase;">Sacred &amp; Authentic Beads</p>
        </div>

        <div style="background:#FFFDF9;border-radius:10px;padding:28px;border:1px solid #EADFD1;">
          <div style="text-align:center;padding-bottom:20px;border-bottom:1px solid #EFE1CF;">
            <h2 style="color:#552912;font-size:20px;margin:0 0 8px 0;">Thank you for your order!</h2>
            <p style="font-size:14px;color:#57534E;margin:0;">
              We&rsquo;ve received your payment and started getting your order ready.
            </p>
          </div>

          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin-top:20px;">
            <tr>
              <td style="font-size:13px;color:#8B7355;padding:4px 0;">Order number</td>
              <td style="font-size:13px;color:#0B0404;font-weight:bold;text-align:right;padding:4px 0;">${esc(order.orderNumber)}</td>
            </tr>
            <tr>
              <td style="font-size:13px;color:#8B7355;padding:4px 0;">Placed on</td>
              <td style="font-size:13px;color:#0B0404;text-align:right;padding:4px 0;">${esc(order.placedOn)}</td>
            </tr>
            ${
              order.paymentReference
                ? `<tr>
              <td style="font-size:13px;color:#8B7355;padding:4px 0;">Payment reference</td>
              <td style="font-size:12px;color:#0B0404;text-align:right;padding:4px 0;font-family:monospace;">${esc(order.paymentReference)}</td>
            </tr>`
                : ""
            }
          </table>

          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin-top:20px;border-top:1px solid #EFE1CF;">
            ${itemRows}
            <tr>
              <td colspan="2" style="padding:16px 0 0 0;font-size:15px;font-weight:bold;color:#0B0404;">Total Paid</td>
              <td style="padding:16px 0 0 0;text-align:right;font-size:17px;font-weight:bold;color:#552912;">${esc(order.totalAmount)}</td>
            </tr>
          </table>

          ${addressBlock}

          <div style="text-align:center;margin-top:28px;">
            <a href="${trackUrl}" style="display:inline-block;background-color:#552912;color:#FFFFFF;font-size:15px;font-weight:bold;text-decoration:none;padding:14px 32px;border-radius:6px;letter-spacing:0.05em;text-transform:uppercase;">Track My Order</a>
          </div>

          <p style="font-size:13px;color:#78716C;text-align:center;margin:20px 0 0 0;line-height:1.6;">
            You can follow your parcel from Order Placed through to Delivered on the order page.
          </p>
        </div>

        <div style="text-align:center;margin-top:26px;font-size:12px;color:#8B7355;">
          <p style="margin:0 0 6px 0;">Need help with this order? Just reply to this email.</p>
          <p style="margin:0;">&copy; ${new Date().getFullYear()} Rudraksh Antiquei. All rights reserved.</p>
        </div>
      </div>
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
