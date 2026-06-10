import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

if (!process.env.MONGODB_URI || !process.env.AUTH_DB_NAME) {
    throw new Error("Missing required env vars MONGODB_URI or AUTH_DB_NAME");
}

const client = new MongoClient(process.env.MONGODB_URI, {
    connectTimeoutMS: 10000,
    serverSelectionTimeoutMS: 10000,
});
const db = client.db(process.env.AUTH_DB_NAME);

export const auth = betterAuth({
    database: mongodbAdapter(db, {
        // Optional: if you don't provide a client, database transactions won't be enabled.
        client
    }),
    emailAndPassword: {
        enabled: true,
    },

    user: {
        additionalFields: {
            role: {
                default: "seeker",
            },
            plan: {
                default: 'seeker_free'
            }
        }
    }
});