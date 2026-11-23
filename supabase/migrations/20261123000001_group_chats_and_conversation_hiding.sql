alter table public.conversations add column title text check (char_length(title) between 1 and 80);
alter table public.conversation_members add column hidden_at timestamptz;

create or replace function public.create_group_conversation(group_title text, target_usernames text[])
returns uuid language plpgsql security definer set search_path = public as $$
declare
  normalized text[];
  member_ids uuid[];
  new_id uuid;
begin
  if auth.uid() is null then raise exception 'Authentication required'; end if;
  group_title := btrim(group_title);
  if char_length(group_title) not between 1 and 80 then raise exception 'Group name must be 1–80 characters'; end if;
  select array_agg(distinct lower(btrim(name))) into normalized from unnest(target_usernames) as name;
  if coalesce(array_length(normalized, 1), 0) not between 2 and 19 then raise exception 'Choose 2–19 other people'; end if;
  if exists (select 1 from unnest(normalized) as name where name !~ '^[a-z0-9_]{3,30}$') then raise exception 'Invalid username'; end if;
  select array_agg(id) into member_ids from public.profiles where lower(username) = any(normalized);
  if coalesce(array_length(member_ids, 1), 0) <> array_length(normalized, 1) then raise exception 'One or more users were not found'; end if;
  if auth.uid() = any(member_ids) then raise exception 'Do not include yourself'; end if;
  insert into public.conversations(title) values (group_title) returning id into new_id;
  insert into public.conversation_members(conversation_id, user_id)
    select new_id, member_id from unnest(array_append(member_ids, auth.uid())) as member_id;
  return new_id;
end;
$$;
revoke all on function public.create_group_conversation(text, text[]) from public, anon, service_role;
grant execute on function public.create_group_conversation(text, text[]) to authenticated;
grant update (hidden_at) on public.conversation_members to authenticated;
