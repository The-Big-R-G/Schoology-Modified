/* eslint-disable no-console */
const { createClient } = require("@supabase/supabase-js");

const [username, password] = process.argv.slice(2);
const projectUrl = process.env.SUPABASE_URL || "https://sksjloysptdwsbsgpgtg.supabase.co";
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!username || !password || !serviceRoleKey) {
    console.error("Usage: SUPABASE_SERVICE_ROLE_KEY=... npm run create:message-user -- <username> <password>");
    console.error("Username: 3–30 letters, numbers, or underscores. Keep the service-role key private.");
    process.exit(1);
}

if (!/^[A-Za-z0-9_]{3,30}$/.test(username)) {
    console.error("Invalid username. Use 3–30 letters, numbers, or underscores.");
    process.exit(1);
}

if (password.length < 6) {
    console.error("Password must be at least 6 characters.");
    process.exit(1);
}

const client = createClient(projectUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
});

async function createMessageUser() {
    // The internal email supports normal password sign-in while keeping the
    // extension's username-only interface.
    const email = `${username.toLowerCase()}@schoologyplus.local`;
    const { data, error } = await client.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
    });

    if (error || !data.user) {
        throw new Error(error?.message || "Supabase did not return a new user.");
    }

    const { error: profileError } = await client.from("profiles").insert({
        id: data.user.id,
        username,
        display_name: username,
    });

    if (profileError) {
        await client.auth.admin.deleteUser(data.user.id);
        throw new Error(`Could not create the profile: ${profileError.message}`);
    }

    console.log(`Created confirmed message account for ${username}.`);
}

createMessageUser().catch((error) => {
    console.error(`Account creation failed: ${error.message}`);
    process.exit(1);
});
