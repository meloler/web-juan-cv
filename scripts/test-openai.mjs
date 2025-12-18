import fs from 'fs';
import path from 'path';

// Manual .env.local parser to avoid dependencies
function loadEnv() {
    try {
        const envPath = path.resolve(process.cwd(), '.env.local');
        if (!fs.existsSync(envPath)) {
            console.error("❌ .env.local file not found!");
            process.exit(1);
        }
        const content = fs.readFileSync(envPath, 'utf-8');
        const match = content.match(/^OPENAI_API_KEY=(.+)$/m);
        if (match) {
            return match[1].trim();
        }
    } catch (e) {
        console.error("❌ Error reading .env.local:", e);
    }
    return null;
}

const key = loadEnv();

console.log("--- DIAGNOSTIC SCRIPT ---");
if (!key) {
    console.error("❌ Could not find OPENAI_API_KEY in .env.local");
    process.exit(1);
}

console.log(`✅ Key found: ${key.slice(0, 10)}...${key.slice(-4)}`);
console.log(`   Length: ${key.length}`);
console.log(`   Whitespace check: ${/\s/.test(key) ? "❌ Contains whitespace!" : "✅ No whitespace"}`);

console.log("\n📡 Testing connection to OpenAI...");

async function testKey() {
    try {
        const response = await fetch("https://api.openai.com/v1/models", {
            headers: {
                "Authorization": `Bearer ${key}`
            }
        });

        const data = await response.json();

        if (response.ok) {
            console.log("✅ SUCCESS! The API key is valid and working.");
            console.log(`   First available model: ${data.data[0].id}`);
        } else {
            console.log("❌ API REJECTED THE KEY");
            console.log(`   Status: ${response.status}`);
            console.log("   Error details:", JSON.stringify(data, null, 2));
        }
    } catch (error) {
        console.error("❌ NETWORK/SCRIPT ERROR:", error);
    }
}

testKey();
