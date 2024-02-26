require('dotenv').config()

const { MongoClient } = require('mongodb');

// Connect to mongodb
const uri = process.env.MONG_URI;
const client = new MongoClient(uri);

// For getting data from mongodb
async function getAllEntries() {
  try {
    await client.connect();

    const database = client.db('test'); // Replace 'test' with your namespace
    const collection = database.collection('rainbows'); // Replace 'rainbows' with your collection

    const entries = await collection.find({}).toArray();

    // for (let i = 0; i < entries.length; i++) {
      for (let i = 0; i < entries.length; i++) {
        setTimeout(() => {
          console.log(`Entry ${i + 1}:`, entries[i]);
          // console.log('............')
          var stringed = entries[i]._id.toString()
          var stringedQuotes = "'" + stringed + "'"
          console.log(stringedQuotes)
          console.log(entries[i].memo ?? null)
          // console.log(stringed.match(regex))
        }, i * 10); // Multiply by 100 to wait for 0.1 seconds
      }

  } finally {
    await client.close();
  }
}

getAllEntries();