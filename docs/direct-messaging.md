# Direct messaging

This extension now includes a user-visible Messages page. It keeps the realtime connection in that page, not in the Manifest V3 service worker, so suspended background workers do not own active chats.

## Supabase setup

1. Create a Supabase project and enable Email/Password sign-in.
2. Run `supabase/migrations/20261117000000_create_direct_messages.sql` in the project SQL editor, or create and apply the migration with the Supabase CLI.
3. Confirm that `messages` is included in the `supabase_realtime` publication. The migration adds it for a new project.
4. Open the extension popup and choose **Open Messages**.
5. Enter the project URL and its publishable key. Never enter a service role or secret key.
6. Create two test accounts with distinct usernames, then start a chat by username.

## Security model

All data tables have Row Level Security enabled. Users can read only conversations and messages where they are members. Direct conversation creation is the only privileged database function; it checks `auth.uid()`, looks up a target profile, and grants execution only to `authenticated` users. Message bodies are displayed using `textContent`, so they are not interpreted as HTML.

The initial discovery model lets signed-in users look up usernames. It does not support message attachments, read receipts, blocking, or message deletion yet.

## Verification

Run `npm run build`. In two browser profiles, sign in with two accounts, create a conversation, send messages in both directions, then refresh the Messages page to confirm persisted history. Test that a third account cannot query either conversation through the Supabase Data API.
