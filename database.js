const { MongoClient, Db } = require("mongodb");
require("dotenv").config();

let databaseUrl = process.env.MONGODB_URI
  //process.env.NODE_ENV === "development"
    //? process.env.MONGODB_URI_DEV || ""
    //: process.env.MONGODB_URI || "";

let cachedDb = null;
let promise = null;

const initDatabase = async () => {
  if (cachedDb) {
    console.log("Using existing connexion !👌");
    return cachedDb;
  }

  if (!promise) {
    promise = new MongoClient(databaseURI, {
      connectTimeoutMS: 10000,
      maxPoolSize: 10,
    });
  }

  console.log("Creating db connexion 🛜");

  const client = await promise;
  const db = await client.db();

  console.log({db})

  cachedDb = db;
  return cachedDb;
};

module.exports = { initDatabase };


  // return client
  //   .connect()
  //   .then((client) => {
  //     let db = client.db();
  //     console.log("Caching DB here");

  //     cachedDb = db;
  //     return cachedDb;
  //   })
  //   .catch((err) => {
  //     console.log("Error connecting to database");
  //     console.log(err);
  //   });
