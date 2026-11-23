-- Each member owns their read position and private hidden-message list.
alter table public.conversation_members add column last_read_at timestamptz;

create table public.hidden_messages (
  user_id uuid not null references auth.users(id) on delete cascade,
  message_id uuid not null references public.messages(id) on delete cascade,
  hidden_at timestamptz not null default now(),
  primary key (user_id, message_id)
);
create index hidden_messages_message_id_idx on public.hidden_messages (message_id);
alter table public.hidden_messages enable row level security;
create policy "users read their hidden messages" on public.hidden_messages
  for select to authenticated using (user_id = (select auth.uid()));
create policy "users hide messages in their conversations" on public.hidden_messages
  for insert to authenticated with check (
    user_id = (select auth.uid()) and exists (
      select 1 from public.messages m
      where m.id = message_id and public.is_conversation_member(m.conversation_id)
    )
  );
create policy "users restore their hidden messages" on public.hidden_messages
  for delete to authenticated using (user_id = (select auth.uid()));

create policy "members update their own read position" on public.conversation_members
  for update to authenticated
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));
grant select, insert, delete on public.hidden_messages to authenticated;
grant update (last_read_at) on public.conversation_members to authenticated;
