-- WhatsApp notification log + settings for info@ inbox alerts

create table if not exists public.email_whatsapp_settings (
  account_id text primary key,
  enabled boolean not null default true,
  notify_phone text not null default '34657106176',
  updated_at timestamptz not null default now()
);

create table if not exists public.email_whatsapp_notification_log (
  id uuid primary key default gen_random_uuid(),
  account_id text not null,
  message_uid bigint not null,
  message_id text,
  from_name text not null default '',
  subject text not null default '',
  notified_at timestamptz not null default now(),
  unique (account_id, message_uid)
);

create index if not exists email_whatsapp_notification_log_account_idx
  on public.email_whatsapp_notification_log (account_id, notified_at desc);

alter table public.email_whatsapp_settings enable row level security;
alter table public.email_whatsapp_notification_log enable row level security;

create policy "email_whatsapp_settings_all" on public.email_whatsapp_settings
  for all using (true) with check (true);

create policy "email_whatsapp_notification_log_all" on public.email_whatsapp_notification_log
  for all using (true) with check (true);

insert into public.email_whatsapp_settings (account_id, enabled, notify_phone)
values ('info', true, '34657106176')
on conflict (account_id) do nothing;
