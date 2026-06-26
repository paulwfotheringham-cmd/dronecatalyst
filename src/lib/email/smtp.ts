import nodemailer from "nodemailer";

import {
  getAccountCredentials,
  ZOHO_SMTP_HOST,
  ZOHO_SMTP_PORT,
} from "@/lib/email/accounts";
import { fetchMailboxMessageById } from "@/lib/email/imap";
import {
  EmailServiceError,
  type EmailAccountId,
  type EmailReplyPayload,
  type EmailSendPayload,
} from "@/lib/email/types";

function createTransport(accountId: EmailAccountId) {
  return getAccountCredentials(accountId).then((credentials) => ({
    credentials,
    transport: nodemailer.createTransport({
      host: ZOHO_SMTP_HOST,
      port: ZOHO_SMTP_PORT,
      secure: true,
      auth: {
        user: credentials.email,
        pass: credentials.password,
      },
    }),
  }));
}

function parseRecipients(value: string | undefined) {
  if (!value?.trim()) return undefined;
  return value
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);
}

export async function sendMailboxEmail(payload: EmailSendPayload) {
  const { credentials, transport } = await createTransport(payload.account);

  try {
    const info = await transport.sendMail({
      from: credentials.email,
      to: parseRecipients(payload.to),
      cc: parseRecipients(payload.cc),
      bcc: parseRecipients(payload.bcc),
      subject: payload.subject,
      text: payload.text,
      html: payload.html ?? payload.text,
    });

    return {
      messageId: info.messageId ?? null,
      accepted: info.accepted,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to send email.";
    throw new EmailServiceError(message, "SEND_FAILED");
  } finally {
    transport.close();
  }
}

export async function sendMailboxReply(payload: EmailReplyPayload) {
  const original = await fetchMailboxMessageById(payload.account, payload.messageId);
  const replyTo = original.fromEmail || original.from;
  const subject = original.subject.toLowerCase().startsWith("re:")
    ? original.subject
    : `Re: ${original.subject}`;
  const text = payload.text ?? payload.html?.replace(/<[^>]+>/g, " ") ?? "";
  const html = payload.html ?? `<p>${text.replace(/\n/g, "<br/>")}</p>`;

  const { credentials, transport } = await createTransport(payload.account);

  try {
    const info = await transport.sendMail({
      from: credentials.email,
      to: replyTo,
      subject,
      text,
      html,
      inReplyTo: original.messageId ?? undefined,
      references: original.messageId
        ? [...original.references, original.messageId].filter(Boolean)
        : original.references,
    });

    return {
      messageId: info.messageId ?? null,
      accepted: info.accepted,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to send reply.";
    throw new EmailServiceError(message, "SEND_FAILED");
  } finally {
    transport.close();
  }
}
