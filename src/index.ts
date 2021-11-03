import express from "express";
import { Client } from "pg";

const PORT = process.env.PORT || 3000;

const client = new Client({
  user: "admin",
  password: "123456",
  host: "srv-captain--temp-postgres-db",
  database: "temp-db",
});

const app = express();

app.get("/ping", async (req, res) => {
  const database = await client
    .query("SELECT 1 + 1")
    .then(() => "up")
    .catch(() => "down");

  res.send({
    environment: process.env.NODE_ENV,
    database,
  });
});

(async () => {
  await client.connect();

  app.listen(PORT, () => {
    console.log("Started at http://localhost:%d", PORT);
  });
})();
