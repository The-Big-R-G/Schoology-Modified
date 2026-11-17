create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text not null unique check (username ~ '^[A-Za-z0-9_]{3,30}$'),
  display_name text,
  created_at timestamptz not null default now()
);

create table public.conversations (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now()
);

create table public.conversation_members (
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  joined_at timestamptz not null default now(),
  primary key (conversation_id, user_id)
);

create table public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  sender_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  body text not null check (char_length(body) between 1 and 2000),
  created_at timestamptz not null default now()
);

create index messages_conversation_created_at_idx on public.messages (conversation_id, created_at);
create index conversation_members_user_id_idx on public.conversation_members (user_id);

alter table public.profiles enable row level security;
alter table public.conversations enable row level security;
alter table public.conversation_members enable row level security;
alter table public.messages enable row level security;

create policy "authenticated users can discover profiles" on public.profiles for select to authenticated using (true);
create policy "users can create their profile" on public.profiles for insert to authenticated with check ((select auth.uid()) = id);
create policy "users can update their profile" on public.profiles for update to authenticated using ((select auth.uid()) = id) with check ((select auth.uid()) = id);

create policy "members can read conversations" on public.conversations for select to authenticated using (
  exists (select 1 from public.conversation_members cm where cm.conversation_id = id and cm.user_id = (select auth.uid()))
);
create policy "members can read memberships" on public.conversation_members for select to authenticated using (
  user_id = (select auth.uid())
);
create policy "members can read messages" on public.messages for select to authenticated using (
  exists (select 1 from public.conversation_members cm where cm.conversation_id = messages.conversation_id and cm.user_id = (select auth.uid()))
);
create policy "members can send messages" on public.messages for insert to authenticated with check (
  sender_id = (select auth.uid()) and exists (select 1 from public.conversation_members cm where cm.conversation_id = messages.conversation_id and cm.user_id = (select auth.uid()))
);

create function public.create_direct_conversation(target_username text)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  target_id uuid;
  new_conversation_id uuid;
begin
  if auth.uid() is null then raise exception 'Authentication required'; end if;
  select id into target_id from public.profiles where username = target_username;
  if target_id is null then raise exception 'User not found'; end if;
  if target_id = auth.uid() then raise exception 'You cannot message yourself'; end if;
  insert into public.conversations default values returning id into new_conversation_id;
  insert into public.conversation_members (conversation_id, user_id) values (new_conversation_id, auth.uid()), (new_conversation_id, target_id);
  return new_conversation_id;
end;
$$;

revoke all on function public.create_direct_conversation(text) from public;
revoke all on function public.create_direct_conversation(text) from anon, service_role;
grant execute on function public.create_direct_conversation(text) to authenticated;
grant usage on schema public to authenticated;
grant select, insert, update on public.profiles to authenticated;
grant select on public.conversations, public.conversation_members to authenticated;
grant select, insert on public.messages to authenticated;

alter publication supabase_realtime add table public.messages;
