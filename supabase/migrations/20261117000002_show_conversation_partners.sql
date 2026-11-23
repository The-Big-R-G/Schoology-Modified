-- Let a signed-in participant identify the other participant(s) in only the
-- conversations to which they belong. The helper bypasses the table's RLS to
-- avoid recursive policy evaluation, and checks auth.uid() itself.
create function public.is_conversation_member(check_conversation_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.conversation_members
    where conversation_id = check_conversation_id
      and user_id = auth.uid()
  );
$$;

revoke all on function public.is_conversation_member(uuid) from public;
revoke all on function public.is_conversation_member(uuid) from anon, service_role;
grant execute on function public.is_conversation_member(uuid) to authenticated;

drop policy "members can read memberships" on public.conversation_members;
create policy "members can read conversation memberships" on public.conversation_members
  for select to authenticated
  using (public.is_conversation_member(conversation_id));
