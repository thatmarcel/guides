import { MongoClient } from "mongodb";

if (!process.env.MONGO_URL) {
    throw new Error('Invalid/Missing environment variable: "MONGODB_URL"');
}

const uri = process.env.MONGO_URL;
const options = {};

let dbClient: MongoClient;

if (process.env.NODE_ENV === "development") {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
    let globalWithMongo = global as typeof globalThis & {
        _mongoClient?: MongoClient;
    };

    if (!globalWithMongo._mongoClient) {
        globalWithMongo._mongoClient = new MongoClient(uri, options);
    }
    dbClient = globalWithMongo._mongoClient;
} else {
    // In production mode, it's best to not use a global variable.
    dbClient = new MongoClient(uri, options);
}

// Export a module-scoped MongoClient. By doing this in a
// separate module, the client can be shared across functions.
export default dbClient;