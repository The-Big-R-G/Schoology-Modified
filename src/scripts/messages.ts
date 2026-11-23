import { createClient, SupabaseClient } from "@supabase/supabase-js";

type Message = { id: string; body: string; created_at: string; sender_id: string };
type Profile = { id: string; username: string };
type Membership = { conversation_id: string; user_id: string; last_read_at: string | null; hidden_at: string | null };
type Configuration = { url: string; key: string };

const DEFAULT_CONFIGURATION: Configuration = {
    url: "https://sksjloysptdwsbsgpgtg.supabase.co",
    key: "sb_publishable_RC8HNGWtcvSkMZDvYuzMiA_z35vBR-2",
};

let client: SupabaseClient | null = null;
let selectedConversation: string | null = null;
let currentUserId: string | null = null;
let activeChannel: ReturnType<SupabaseClient["channel"]> | null = null;
const conversationLabels = new Map<string, string>();
const groupConversations = new Set<string>();

const element = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;
const status = (message: string, error = false) => {
    const target = element<HTMLElement>("status");
    target.textContent = message;
    target.classList.toggle("messages-error", error);
};

const storage = {
    getItem: async (key: string) => (await chrome.storage.local.get(key))[key] ?? null,
    setItem: async (key: string, value: string) => chrome.storage.local.set({ [key]: value }),
    removeItem: async (key: string) => chrome.storage.local.remove(key),
};

const usernamePattern = /^[A-Za-z0-9_]{3,30}$/;
const internalEmailFor = (username: string) => `${username.toLowerCase()}@schoologyplus.invalid`;
const usernameFromInternalEmail = (email?: string) => email?.replace(/@schoologyplus\.invalid$/i, "") ?? "";

function createMessagingClient(configuration: Configuration) {
    client = createClient(configuration.url, configuration.key, {
        auth: { storage, persistSession: true, autoRefreshToken: true, detectSessionInUrl: false },
    });
    return client;
}

async function loadConfiguration() {
    const data = await chrome.storage.local.get(["messagesConfiguration"]);
    const configuration = (data.messagesConfiguration as Configuration | undefined) ?? DEFAULT_CONFIGURATION;
    element<HTMLInputElement>("supabase-url").value = configuration.url;
    element<HTMLInputElement>("supabase-key").value = configuration.key;
    createMessagingClient(configuration);
    await refreshSession();
}

function show(section: "configuration" | "authentication" | "inbox") {
    for (const id of ["configuration", "authentication", "inbox"] as const) {
        element<HTMLElement>(id).hidden = id !== section;
    }
    element<HTMLButtonElement>("sign-out").hidden = section !== "inbox";
}

async function refreshSession() {
    if (!client) return show("authentication");
    const { data, error } = await client.auth.getUser();
    if (error || !data.user) {
        currentUserId = null;
        return show("authentication");
    }
    currentUserId = data.user.id;
    show("inbox");
    const username = element<HTMLInputElement>("auth-username").value.trim().toLowerCase() || usernameFromInternalEmail(data.user.email);
    if (usernamePattern.test(username)) {
        await client.from("profiles").upsert({ id: data.user.id, username, display_name: username });
    }
    await loadConversations();
    client.channel(`inbox:${currentUserId}`).on("postgres_changes", { event: "INSERT", schema: "public", table: "messages" }, () => { void loadConversations(); }).subscribe();
}

async function loadConversations() {
    if (!client || !currentUserId) return;
    const { data, error } = await client.from("conversation_members").select("conversation_id, user_id, last_read_at, hidden_at");
    if (error) return status(error.message, true);
    const memberships = (data ?? []) as Membership[];
    const partnerIds = [...new Set(memberships.filter(membership => membership.user_id !== currentUserId).map(membership => membership.user_id))];
    const { data: profiles } = partnerIds.length
        ? await client.from("profiles").select("id, username").in("id", partnerIds)
        : { data: [] as Profile[] };
    const usernames = new Map((profiles ?? []).map((profile: Profile) => [profile.id, profile.username]));
    const conversationIds = [...new Set(memberships.filter(m => m.user_id === currentUserId && !m.hidden_at).map(m => m.conversation_id))];
    const { data: conversations, error: conversationsError } = conversationIds.length
        ? await client.from("conversations").select("id, title").in("id", conversationIds)
        : { data: [], error: null };
    if (conversationsError) return status(conversationsError.message, true);
    const titles = new Map((conversations ?? []).map(item => [item.id, item.title as string | null]));
    conversationLabels.clear();
    groupConversations.clear();
    for (const membership of memberships) {
        if (membership.user_id === currentUserId) continue;
        if (titles.get(membership.conversation_id)) continue;
        const label = `@${usernames.get(membership.user_id) ?? "unknown"}`;
        conversationLabels.set(membership.conversation_id, conversationLabels.has(membership.conversation_id)
            ? `${conversationLabels.get(membership.conversation_id)}, ${label}` : label);
    }
    for (const [id, title] of titles) if (title) { conversationLabels.set(id, title); groupConversations.add(id); }
    const list = element<HTMLUListElement>("conversation-list");
    list.replaceChildren();
    const { data: recentMessages } = conversationIds.length ? await client.from("messages").select("conversation_id, body, created_at, sender_id, id").in("conversation_id", conversationIds).order("created_at", { ascending: false }) : { data: [] };
    const { data: hidden } = await client.from("hidden_messages").select("message_id");
    const hiddenIds = new Set((hidden ?? []).map(item => item.message_id));
    const previews = new Map<string, { body: string; created_at: string }>();
    let unreadTotal = 0;
    const reads = new Map(memberships.filter(m => m.user_id === currentUserId && !m.hidden_at).map(m => [m.conversation_id, m.last_read_at]));
    const unread = new Map<string, number>();
    for (const message of recentMessages ?? []) {
        if (hiddenIds.has(message.id)) continue;
        if (!previews.has(message.conversation_id)) previews.set(message.conversation_id, message);
        if (message.sender_id !== currentUserId && (!reads.get(message.conversation_id) || message.created_at > reads.get(message.conversation_id)!)) {
            unread.set(message.conversation_id, (unread.get(message.conversation_id) ?? 0) + 1);
            unreadTotal++;
        }
    }
    chrome.runtime.sendMessage({ type: "messagesUnreadCount", count: unreadTotal }).catch(() => {});
    for (const conversationId of conversationIds) {
        const button = document.createElement("button");
        button.className = "conversation-item";
        button.classList.toggle("unread", Boolean(unread.get(conversationId)));
        button.classList.toggle("selected", conversationId === selectedConversation);
        const avatar = document.createElement("span"); avatar.className = "avatar"; avatar.textContent = (conversationLabels.get(conversationId) ?? "?").replace("@", "").slice(0, 1).toUpperCase();
        const details = document.createElement("span"); details.className = "conversation-details";
        const name = document.createElement("strong"); name.textContent = conversationLabels.get(conversationId) ?? "@unknown";
        const preview = document.createElement("span"); preview.className = "conversation-preview"; preview.textContent = previews.get(conversationId)?.body ?? "Start the conversation";
        const time = document.createElement("time"); time.className = "conversation-time"; if (previews.has(conversationId)) time.textContent = new Date(previews.get(conversationId)!.created_at).toLocaleDateString([], { month: "short", day: "numeric" });
        details.append(name, preview); button.append(avatar, details, time);
        if (unread.get(conversationId)) { const badge = document.createElement("span"); badge.className = "unread-badge"; badge.textContent = String(unread.get(conversationId)); button.append(badge); }
        button.addEventListener("click", () => openConversation(conversationId));
        const item = document.createElement("li");
        item.append(button);
        list.append(item);
    }
}

async function openConversation(id: string) {
    if (!client) return;
    selectedConversation = id;
    element<HTMLElement>("chat-placeholder").hidden = true;
    element<HTMLElement>("active-chat").hidden = false;
    element<HTMLElement>("conversation-title").textContent = conversationLabels.get(id) ?? "@unknown";
    element<HTMLElement>("chat-presence").textContent = groupConversations.has(id) ? "Group chat" : "Direct message";
    element<HTMLElement>("chat-avatar").textContent = (conversationLabels.get(id) ?? "?").replace("@", "").slice(0, 1).toUpperCase();
    document.querySelectorAll(".conversation-item").forEach(item => item.classList.toggle("selected", item.textContent?.includes(conversationLabels.get(id) ?? "")));
    element<HTMLFormElement>("message-form").hidden = false;
    await loadMessages(true);
    const { error: readError } = await client.from("conversation_members").update({ last_read_at: new Date().toISOString() }).eq("conversation_id", id).eq("user_id", currentUserId!);
    if (readError) status(readError.message, true);
    await loadConversations();
    if (activeChannel) await client.removeChannel(activeChannel);
    activeChannel = client
        .channel(`conversation:${id}`)
        .on("postgres_changes", { event: "INSERT", schema: "public", table: "messages", filter: `conversation_id=eq.${id}` }, async () => { await loadMessages(); await client!.from("conversation_members").update({ last_read_at: new Date().toISOString() }).eq("conversation_id", id).eq("user_id", currentUserId!); await loadConversations(); })
        .subscribe();
}

async function loadMessages(scrollToLatest = false) {
    if (!client || !selectedConversation) return;
    const { data, error } = await client
        .from("messages")
        .select("id, body, created_at, sender_id")
        .eq("conversation_id", selectedConversation)
        .order("created_at", { ascending: true });
    if (error) return status(error.message, true);
    const list = element<HTMLOListElement>("message-list");
    const wasNearBottom = list.scrollHeight - list.scrollTop - list.clientHeight < 80;
    const previousScroll = list.scrollTop;
    list.replaceChildren();
    const messages = (data ?? []) as Message[];
    const { data: hidden } = await client.from("hidden_messages").select("message_id");
    const hiddenIds = new Set((hidden ?? []).map(item => item.message_id));
    const senderIds = [...new Set(messages.map(message => message.sender_id))];
    const { data: profiles } = senderIds.length
        ? await client.from("profiles").select("id, username").in("id", senderIds)
        : { data: [] as Profile[] };
    const usernames = new Map((profiles ?? []).map((profile: Profile) => [profile.id, profile.username]));

    for (const message of messages) {
        if (hiddenIds.has(message.id)) continue;
        const item = document.createElement("li");
        const sender = document.createElement("strong");
        sender.className = "message-sender";
        const mine = message.sender_id === currentUserId;
        item.classList.toggle("mine", mine);
        sender.textContent = mine ? "You" : `@${usernames.get(message.sender_id) ?? "unknown"}`;
        const body = document.createElement("span");
        body.className = "message-body";
        body.textContent = message.body;
        item.append(sender, body);
        const time = document.createElement("time"); time.className = "message-time"; time.dateTime = message.created_at; time.textContent = new Date(message.created_at).toLocaleString([], { dateStyle: "medium", timeStyle: "short" });
        const hide = document.createElement("button"); hide.type = "button"; hide.className = "hide-message"; hide.textContent = "Delete"; hide.title = "Hide this message for you";
        hide.addEventListener("click", async () => { const { error } = await client!.from("hidden_messages").insert({ message_id: message.id, user_id: currentUserId }); if (error) return status(error.message, true); await loadMessages(); await loadConversations(); });
        item.append(time, hide);
        list.append(item);
    }
    if (scrollToLatest || wasNearBottom) list.scrollTop = list.scrollHeight;
    else list.scrollTop = previousScroll;
}

async function saveConfiguration() {
    const configuration = { url: element<HTMLInputElement>("supabase-url").value.trim(), key: element<HTMLInputElement>("supabase-key").value.trim() };
    if (!/^https:\/\/[a-z0-9-]+\.supabase\.co$/i.test(configuration.url) || !configuration.key) {
        return status("Enter a valid Supabase project URL and publishable key.", true);
    }
    await chrome.storage.local.set({ messagesConfiguration: configuration });
    createMessagingClient(configuration);
    status("Connection saved.");
    show("authentication");
}

async function authenticate(mode: "signInWithPassword" | "signUp") {
    if (!client) return;
    const password = element<HTMLInputElement>("auth-password").value;
    const username = element<HTMLInputElement>("auth-username").value.trim().toLowerCase();
    if (!usernamePattern.test(username)) return status("Use 3–30 letters, numbers, or underscores for your username.", true);
    const result = mode === "signUp"
        ? await client.auth.signUp({ email: internalEmailFor(username), password, options: { data: { username, display_name: username } } })
        : await client.auth.signInWithPassword({ email: internalEmailFor(username), password });
    if (result.error) {
        const reason = result.error.message;
        if (/rate limit|email rate/i.test(reason)) return status("Supabase is temporarily limiting signup emails. Wait before retrying, or raise the email provider's rate limit in Supabase Auth settings.", true);
        if (mode === "signUp" && /email|confirm|deliver/i.test(reason)) return status("Username-only signup requires email confirmation to be disabled in Supabase: Authentication → Providers → Email → Confirm email. Then try again.", true);
        return status(reason, true);
    }
    if (mode === "signUp" && !result.data.session) {
        return status("Supabase requires email confirmation, so username-only signup is not enabled yet. Disable Confirm email under Authentication → Providers → Email in Supabase, then try again.", true);
    }
    await refreshSession();
}

element<HTMLButtonElement>("save-configuration").addEventListener("click", saveConfiguration);
element<HTMLButtonElement>("new-chat-toggle").addEventListener("click", () => { const form = element<HTMLFormElement>("new-conversation"); form.hidden = !form.hidden; if (!form.hidden) element<HTMLInputElement>("recipient").focus(); });
element<HTMLSelectElement>("chat-type").addEventListener("change", () => {
    const group = element<HTMLSelectElement>("chat-type").value === "group";
    element<HTMLElement>("direct-recipient-label").hidden = group;
    element<HTMLElement>("group-fields").hidden = !group;
    (group ? element<HTMLInputElement>("group-title") : element<HTMLInputElement>("recipient")).focus();
});
element<HTMLButtonElement>("delete-conversation").addEventListener("click", async () => {
    if (!client || !selectedConversation || !currentUserId) return;
    const id = selectedConversation;
    const { error } = await client.from("conversation_members").update({ hidden_at: new Date().toISOString(), last_read_at: new Date().toISOString() }).eq("conversation_id", id).eq("user_id", currentUserId);
    if (error) return status(error.message, true);
    selectedConversation = null;
    if (activeChannel) { await client.removeChannel(activeChannel); activeChannel = null; }
    element<HTMLElement>("active-chat").hidden = true;
    element<HTMLElement>("chat-placeholder").hidden = false;
    await loadConversations();
    status("Conversation removed from your chat list. Other members still have their messages.");
});
element<HTMLButtonElement>("sign-in").addEventListener("click", () => authenticate("signInWithPassword"));
element<HTMLButtonElement>("sign-up").addEventListener("click", () => {
    authenticate("signUp");
});
element<HTMLButtonElement>("sign-out").addEventListener("click", async () => { await client?.auth.signOut(); selectedConversation = null; currentUserId = null; conversationLabels.clear(); chrome.runtime.sendMessage({ type: "messagesUnreadCount", count: 0 }).catch(() => {}); show("authentication"); });
element<HTMLFormElement>("new-conversation").addEventListener("submit", async event => {
    event.preventDefault();
    if (!client) return;
    const group = element<HTMLSelectElement>("chat-type").value === "group";
    const names = element<HTMLInputElement>("group-recipients").value.split(",").map(name => name.trim().replace(/^@/, "")).filter(Boolean);
    if (group && (names.length < 2 || names.length > 19 || names.some(name => !usernamePattern.test(name)))) return status("Enter 2–19 valid usernames, separated by commas.", true);
    const { data, error } = group
        ? await client.rpc("create_group_conversation", { group_title: element<HTMLInputElement>("group-title").value.trim(), target_usernames: names })
        : await client.rpc("create_direct_conversation", { target_username: element<HTMLInputElement>("recipient").value.trim().replace(/^@/, "") });
    if (error) return status(error.message, true);
    element<HTMLFormElement>("new-conversation").reset();
    element<HTMLElement>("new-conversation").hidden = true;
    element<HTMLElement>("direct-recipient-label").hidden = false;
    element<HTMLElement>("group-fields").hidden = true;
    await loadConversations();
    await openConversation(data as string);
});
element<HTMLFormElement>("message-form").addEventListener("submit", async event => {
    event.preventDefault();
    if (!client || !selectedConversation) return;
    const body = element<HTMLTextAreaElement>("message-body").value.trim();
    if (!body) return;
    const { error } = await client.from("messages").insert({ conversation_id: selectedConversation, body });
    if (error) return status(error.message, true);
    element<HTMLTextAreaElement>("message-body").value = "";
    await loadMessages();
});

element<HTMLTextAreaElement>("message-body").addEventListener("keydown", event => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); element<HTMLFormElement>("message-form").requestSubmit(); } });

loadConfiguration();
