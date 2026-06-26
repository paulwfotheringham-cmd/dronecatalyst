-- Server-side Zoho mailbox credentials (passwords never sent to the client)

create table if not exists public.email_mailbox_credentials (
  account_id text primary key check (account_id in ('info', 'paul')),
  email text not null,
  password text not null,
  updated_at timestamptz not null default now()
);

alter table public.email_mailbox_credentials enable row level security;

create policy "email_mailbox_credentials_all" on public.email_mailbox_credentials
  for all using (true) with check (true);
