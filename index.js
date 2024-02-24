require('dotenv').config()

const { MongoClient } = require('mongodb');

const uri = process.env.MONG_URI;
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const client = new MongoClient(uri);

async function getAllEntries() {
  try {
    await client.connect();

    const database = client.db('test'); // Replace 'test' with your namespace
    const collection = database.collection('rainbows'); // Replace 'rainbows' with your collection

    const entries = await collection.find({}).toArray();

    // console.log(entries);

    // entries.forEach((entry, index) => {
    //     console.log(`Entry ${index + 1}:`, entry);
    //   });

    for (let i = 0; i < entries.length; i++) {
        setTimeout(() => {
          console.log(`Entry ${i + 1}:`, entries[i]);
        }, i * 20); // Multiply by 100 to wait for 0.1 seconds
      }

  } finally {
    await client.close();
  }
}

getAllEntries();