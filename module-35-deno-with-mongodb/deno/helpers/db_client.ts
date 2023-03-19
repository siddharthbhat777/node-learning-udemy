import { MongoClient, Database } from "https://deno.land/x/mongo@v0.31.2/mod.ts";

let db: Database;

export async function connect() {
  const client = new MongoClient();

  // Connecting to a Local Database
  await client.connect(
    "mongodb+srv://deno-learning-user:SidB2023@denolearningcluster.v77w0fy.mongodb.net/?authMechanism=SCRAM-SHA-1",
  );

  db = client.database("todo-app");
}

export function getDb() {
  return db;
}