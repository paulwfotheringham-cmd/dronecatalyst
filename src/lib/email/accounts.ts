import type { EmailAccount, EmailAccountId } from "@/lib/email/types";

export const ZOHO_IMAP_HOST = "imap.zoho.eu";
export const ZOHO_IMAP_PORT = 993;
export const ZOHO_SMTP_HOST = "smtp.zoho.eu";
export const ZOHO_SMTP_PORT = 465;

const ACCOUNT_DEFINITIONS: readonly EmailAccount[] = [
  {
    id: "info",
    email: "info@dronecatalyst.com",
    name: "Shared Inbox",
  },
  {
    id: "paul",
    email: "paul@dronecatalyst.com",
    name: "Paul",
  },
];

export function getPublicEmailAccounts(): EmailAccount[] {
  return ACCOUNT_DEFINITIONS.map((account) => ({
    ...account,
    email: resolveAccountEmail(account.id) ?? account.email,
  }));
}

export function getAccountDefinition(id: EmailAccountId): EmailAccount {
  const account = ACCOUNT_DEFINITIONS.find((entry) => entry.id === id);
  if (!account) throw new Error(`Unknown mailbox: ${id}`);
  return {
    ...account,
    email: resolveAccountEmail(id) ?? account.email,
  };
}

export function resolveAccountEmail(id: EmailAccountId): string | null {
  if (id === "info") return process.env.ZOHO_INFO_EMAIL?.trim() || null;
  return process.env.ZOHO_PAUL_EMAIL?.trim() || null;
}

export function getAccountCredentials(id: EmailAccountId): { email: string; password: string } {
  const email = resolveAccountEmail(id);
  const password =
    id === "info"
      ? process.env.ZOHO_INFO_PASSWORD?.trim()
      : process.env.ZOHO_PAUL_PASSWORD?.trim();

  if (!email || !password) {
    throw new Error(
      id === "info"
        ? "Zoho info mailbox is not configured. Set ZOHO_INFO_EMAIL and ZOHO_INFO_PASSWORD."
        : "Zoho paul mailbox is not configured. Set ZOHO_PAUL_EMAIL and ZOHO_PAUL_PASSWORD.",
    );
  }

  return { email, password };
}

export function isAccountConfigured(id: EmailAccountId): boolean {
  try {
    getAccountCredentials(id);
    return true;
  } catch {
    return false;
  }
}

export function isAnyMailboxConfigured(): boolean {
  return isAccountConfigured("info") || isAccountConfigured("paul");
}

export function parseAccountId(value: string | null): EmailAccountId | null {
  if (value === "info" || value === "paul") return value;
  return null;
}
