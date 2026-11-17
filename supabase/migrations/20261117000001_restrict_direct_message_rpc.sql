-- Supabase projects grant EXECUTE to anon by default.  This RPC must only be
-- callable by an authenticated user because it creates membership rows.
revoke all on function public.create_direct_conversation(text) from public;
revoke all on function public.create_direct_conversation(text) from anon, service_role;
grant execute on function public.create_direct_conversation(text) to authenticated;
