import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { MongoClient } from "mongodb";
import cors from "cors";

dotenv.config();

// Connection URL
const url = process.env.MONGO_URI;
const client = new MongoClient(url);

// Database Name
const dbName = "passop";
const app = express();
const port = 3000;

app.use(bodyParser.json());

// CORS configuration
app.use(cors({
  origin: [
    'https://passop-live.onrender.com',
    'http://localhost:5173',
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));


client
  .connect()
  .then(() => {
    const db = client.db(dbName);
    const collection = db.collection("passwords");

    // Get all the passwords
    app.get("/", async (req, res) => {
      console.log("Fetching all passwords...");
      const findResult = await collection.find({}).toArray();
      res.send(findResult);
    });

    // Save a password
    app.post("/", async (req, res) => {
      const credentials = req.body;
      if (!credentials.site || !credentials.userName || !credentials.passWord) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      console.log("Saving password:", credentials);
      await collection.insertOne(credentials);
      const findResult = await collection.find({}).toArray();
      res.send({ success: true, result: findResult });
    });


    // Delete a password by id
    app.delete("/", async (req, res) => {
      const { id } = req.body;
      const credentials = req.body;

      if (!credentials.site || !credentials.userName || !credentials.passWord) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      await collection.deleteOne({ id });
      const findResult = await collection.find({}).toArray();
      res.send({ success: true, result: findResult });
    });

    // Update a password by id
    app.put('/', async (req, res) => {
      const { id, site, userName, passWord } = req.body;
      try {
        await db.collection('passwords').updateOne({ id }, { $set: { site, userName, passWord } });
        const updatedPasswords = await db.collection('passwords').find().toArray();
        res.json(updatedPasswords);
      } catch (error) {
        console.error('Failed to update password:', error);
        res.status(500).json({ error: 'Failed to update password' });
      }
    });

    app.listen(port, () => {
      console.log(`App listening on http://localhost:${port}`);
    });
  })

  .catch((error) => {
    console.error("Failed to connect to the database", error);
    process.exit(1);
  });
