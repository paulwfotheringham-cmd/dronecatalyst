import { createSupabaseServerClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { fetchMailboxMessages } from "@/lib/email/imap";
import type { EmailMessage } from "@/lib/email/types";
import {
  formatNewEmailWhatsAppMessage,
  getWhatsAppNotifyPhone,
  isWhatsAppConfigured,
  sendWhatsAppMessage,
} from "@/lib/email/whatsapp";

type WhatsAppSettingsRow = {
  account_id: string;
  enabled: boolean;
  notify_phone: string;
  updated_at: string;
};

function requireSupabase() {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase is not configured.");
  }
  return createSupabaseServerClient();
}

export async function getWhatsAppNotificationStatus() {
  const configured = isWhatsAppConfigured();
  const phone = getWhatsAppNotifyPhone();

  if (!isSupabaseConfigured()) {
    return {
      configured,
      enabled: configured,
      phone,
      lastNotifiedAt: null as string | null,
    };
  }

  const supabase = requireSupabase();
  const [{ data: settings }, { data: lastLog }] = await Promise.all([
    supabase.from("email_whatsapp_settings").select("*").eq("account_id", "info").maybeSingle(),
    supabase
      .from("email_whatsapp_notification_log")
      .select("notified_at")
      .eq("account_id", "info")
      .order("notified_at", { ascending: false })
      .limit(1)
      .maybeSingle(),
  ]);

  const row = settings as WhatsAppSettingsRow | null;

  return {
    configured,
    enabled: configured && (row?.enabled ?? true),
    phone: row?.notify_phone ?? phone,
    lastNotifiedAt: (lastLog as { notified_at?: string } | null)?.notified_at ?? null,
  };
}

export async function setWhatsAppNotificationsEnabled(enabled: boolean) {
  const supabase = requireSupabase();
  const phone = getWhatsAppNotifyPhone();

  const { data, error } = await supabase
    .from("email_whatsapp_settings")
    .upsert(
      {
        account_id: "info",
        enabled,
        notify_phone: phone,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "account_id" },
    )
    .select("*")
    .single();

  if (error) throw new Error(error.message);
  return data as WhatsAppSettingsRow;
}

async function isWhatsAppEnabledForInfo() {
  if (!isWhatsAppConfigured()) return false;
  if (!isSupabaseConfigured()) return true;

  const supabase = requireSupabase();
  const { data } = await supabase
    .from("email_whatsapp_settings")
    .select("enabled")
    .eq("account_id", "info")
    .maybeSingle();

  return (data as { enabled?: boolean } | null)?.enabled ?? true;
}

async function wasMessageNotified(messageUid: number) {
  if (!isSupabaseConfigured()) return false;

  const supabase = requireSupabase();
  const { data } = await supabase
    .from("email_whatsapp_notification_log")
    .select("id")
    .eq("account_id", "info")
    .eq("message_uid", messageUid)
    .maybeSingle();

  return Boolean(data);
}

async function markMessageNotified(message: EmailMessage) {
  if (!isSupabaseConfigured()) return;

  const supabase = requireSupabase();
  const { error } = await supabase.from("email_whatsapp_notification_log").upsert(
    {
      account_id: "info",
      message_uid: message.uid,
      message_id: message.messageId,
      from_name: message.fromName,
      subject: message.subject,
      notified_at: new Date().toISOString(),
    },
    { onConflict: "account_id,message_uid" },
  );

  if (error) throw new Error(error.message);
}

export async function processInfoMailboxWhatsAppNotifications(
  prefetchedMessages?: EmailMessage[],
) {
  if (!(await isWhatsAppEnabledForInfo())) {
    return { sent: 0, skipped: "disabled" as const };
  }

  const messages = prefetchedMessages ?? (await fetchMailboxMessages("info"));
  const candidates = messages.filter(
    (message) => message.direction === "inbound" && message.unread,
  );

  let sent = 0;
  const results: Array<{ messageUid: number; subject: string; ok: boolean; error?: string }> = [];

  for (const message of candidates) {
    if (await wasMessageNotified(message.uid)) continue;

    try {
      await sendWhatsAppMessage(
        formatNewEmailWhatsAppMessage(message.fromName, message.subject),
      );
      await markMessageNotified(message);
      sent += 1;
      results.push({ messageUid: message.uid, subject: message.subject, ok: true });
    } catch (error) {
      results.push({
        messageUid: message.uid,
        subject: message.subject,
        ok: false,
        error: error instanceof Error ? error.message : "Notification failed.",
      });
    }
  }

  return { sent, skipped: null, results };
}

export async function sendWhatsAppTestNotification() {
  return sendWhatsAppMessage(
    formatNewEmailWhatsAppMessage("DroneCatalyst Test", "WhatsApp alerts are working"),
  );
}
