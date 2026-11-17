-- Supabase may grant newly created functions to anon by default. Keep this
-- SECURITY DEFINER RPC available only to an authenticated extension user.
revoke all on function public.create_direct_conversation(text) from public;
revoke all on function public.create_direct_conversation(text) from anon, service_role;
grant execute on function public.create_direct_conversation(text) to authenticated;
