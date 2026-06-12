import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) {
    throw new Error("MONGODB_URI is not defined");
}

const dbName = process.env.AUTH_DB_NAME || process.env.MONGODB_DB || "hireloop";

if (!globalThis.__hireloop_mongo__) {
    const client = new MongoClient(uri);
    globalThis.__hireloop_mongo__ = {
        client,
        db: client.db(dbName),
    };
}

export const client = globalThis.__hireloop_mongo__.client;
export const db = globalThis.__hireloop_mongo__.db;
