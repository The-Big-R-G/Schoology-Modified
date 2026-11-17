import { createClient, SupabaseClient } from "@supabase/supabase-js";

type Message = { id: string; body: string; created_at: string; sender_id: string };
type Configuration = { url: string; key: string };

let client: SupabaseClient | null = null;
let selectedConversation: string | null = null;
let activeChannel: ReturnType<SupabaseClient["channel"]> | null = null;

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

function createMessagingClient(configuration: Configuration) {
    client = createClient(configuration.url, configuration.key, {
        auth: { storage, persistSession: true, autoRefreshToken: true, detectSessionInUrl: false },
    });
    return client;
}

async function loadConfiguration() {
    const data = await chrome.storage.local.get(["messagesConfiguration"]);
    const configuration = data.messagesConfiguration as Configuration | undefined;
    if (!configuration?.url || !configuration?.key) return;
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
    if (!client) return show("configuration");
    const { data, error } = await client.auth.getUser();
    if (error || !data.user) return show("authentication");
    show("inbox");
    await client.from("profiles").upsert({
        id: data.user.id,
        username: element<HTMLInputElement>("auth-username").value || data.user.email!.split("@")[0],
        display_name: data.user.email,
    });
    await loadConversations();
}

async function loadConversations() {
    if (!client) return;
    const { data, error } = await client.from("conversation_members").select("conversation_id");
    if (error) return status(error.message, true);
    const list = element<HTMLUListElement>("conversation-list");
    list.replaceChildren();
    for (const membership of data ?? []) {
        const button = document.createElement("button");
        button.textContent = `Conversation ${membership.conversation_id.slice(0, 8)}`;
        button.addEventListener("click", () => openConversation(membership.conversation_id));
        const item = document.createElement("li");
        item.append(button);
        list.append(item);
    }
}

async function openConversation(id: string) {
    if (!client) return;
    selectedConversation = id;
    element<HTMLElement>("conversation-title").textContent = `Conversation ${id.slice(0, 8)}`;
    element<HTMLFormElement>("message-form").hidden = false;
    await loadMessages();
    if (activeChannel) await client.removeChannel(activeChannel);
    activeChannel = client
        .channel(`conversation:${id}`)
        .on("postgres_changes", { event: "INSERT", schema: "public", table: "messages", filter: `conversation_id=eq.${id}` }, loadMessages)
        .subscribe();
}

async function loadMessages() {
    if (!client || !selectedConversation) return;
    const { data, error } = await client
        .from("messages")
        .select("id, body, created_at, sender_id")
        .eq("conversation_id", selectedConversation)
        .order("created_at", { ascending: true });
    if (error) return status(error.message, true);
    const list = element<HTMLOListElement>("message-list");
    list.replaceChildren();
    for (const message of (data ?? []) as Message[]) {
        const item = document.createElement("li");
        item.textContent = message.body;
        item.title = new Date(message.created_at).toLocaleString();
        list.append(item);
    }
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
    const email = element<HTMLInputElement>("auth-email").value.trim();
    const password = element<HTMLInputElement>("auth-password").value;
    const username = element<HTMLInputElement>("auth-username").value.trim();
    if (!/^[A-Za-z0-9_]{3,30}$/.test(username)) return status("Use 3–30 letters, numbers, or underscores for your username.", true);
    const result = await client.auth[mode]({ email, password });
    if (result.error) return status(result.error.message, true);
    if (mode === "signUp" && !result.data.session) return status("Check your email to confirm the account, then sign in.");
    await refreshSession();
}

element<HTMLButtonElement>("save-configuration").addEventListener("click", saveConfiguration);
element<HTMLButtonElement>("sign-in").addEventListener("click", () => authenticate("signInWithPassword"));
element<HTMLButtonElement>("sign-up").addEventListener("click", () => authenticate("signUp"));
element<HTMLButtonElement>("sign-out").addEventListener("click", async () => { await client?.auth.signOut(); selectedConversation = null; show("authentication"); });
element<HTMLFormElement>("new-conversation").addEventListener("submit", async event => {
    event.preventDefault();
    if (!client) return;
    const { data, error } = await client.rpc("create_direct_conversation", { target_username: element<HTMLInputElement>("recipient").value.trim() });
    if (error) return status(error.message, true);
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
});

loadConfiguration();
