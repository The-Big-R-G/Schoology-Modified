/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");

function loadLocalEnvironment() {
    const environmentFile = path.resolve(__dirname, "../.env");
    if (!fs.existsSync(environmentFile)) return;
    for (const line of fs.readFileSync(environmentFile, "utf8").split(/\r?\n/)) {
        const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
        if (!match || process.env[match[1]] !== undefined) continue;
        const value = match[2].replace(/^(['"])(.*)\1$/, "$2");
        process.env[match[1]] = value;
    }
}

loadLocalEnvironment();

const [providedUsername, password] = process.argv.slice(2);
const username = providedUsername?.trim().toLowerCase();
const projectUrl = process.env.SUPABASE_URL || "https://sksjloysptdwsbsgpgtg.supabase.co";
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!username || !password || !serviceRoleKey) {
    console.error("Usage: npm run create:message-user -- <username> <password>");
    console.error("Add SUPABASE_SERVICE_ROLE_KEY to .env first. Keep that key private.");
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
    const email = `${username.toLowerCase()}@schoologyplus.invalid`;
    const { data: existingProfile, error: existingProfileError } = await client
        .from("profiles")
        .select("id")
        .eq("username", username)
        .maybeSingle();

    if (existingProfileError) {
        throw new Error(`Could not check for an existing profile: ${existingProfileError.message}`);
    }

    // This also repairs accounts made by the first version of this script,
    // which used the obsolete .local internal email address.
    if (existingProfile) {
        const { error } = await client.auth.admin.updateUserById(existingProfile.id, {
            email,
            password,
            email_confirm: true,
        });
        if (error) throw new Error(error.message);
        console.log(`Updated confirmed message account for ${username}.`);
        return;
    }

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
