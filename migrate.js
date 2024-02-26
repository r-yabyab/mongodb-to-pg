require('dotenv').config()

const { MongoClient } = require('mongodb');
const { Pool } = require('pg');
const pgPool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

// Connect to mongodb
const uri = process.env.MONG_URI;
const client = new MongoClient(uri);

async function getAllEntries() {
  try {
    await client.connect();

    const database = client.db('test'); // Replace 'test' with your namespace
    const collection = database.collection('rainbows'); // Replace 'rainbows' with your collection

    const entries = await collection.find({}).toArray();

    for (let i = 0; i < entries.length; i++) {
          console.log(`Entry ${i + 1}:`, entries[i]);
          
          const pgClient = await pgPool.connect();
          try {
            // await pgClient.query('INSERT INTO submissions(_id, userid, number, timeslept, activities, memo, createdat, updatedat, __v) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)', [
            //   entry.field1,
            //   entry.field2

            const text = 'INSERT INTO submissions(_id, userid, number, timeslept, activities, memo, createdat, updatedat, __v) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)'
            var stringed_id = entries[i]._id.toString()
            var stringedQuotes_id = "'" + stringed_id + "'"
            const values =
              [
                stringed_id,
                entries[i].userID || null,
                entries[i].number,
                entries[i].timeSlept || null,
                entries[i].activities || null,
                entries[i].memo || null,
                entries[i].createdAt,
                entries[i].updatedAt,
                entries[i].__v,
              ]
            const res = await pgClient.query(text, values)
            console.log(res.rows[0])


            // ])
          } catch (error) {
            console.error(error + "error")
          } finally {
            pgClient.release();
          }

      }

  } finally {
    await client.close();
  }
}

getAllEntries();




// // For getting data from mongodb
// async function getAllEntries() {
//   try {
//     await client.connect();

//     const database = client.db('test'); // Replace 'test' with your namespace
//     const collection = database.collection('rainbows'); // Replace 'rainbows' with your collection

//     const entries = await collection.find({}).toArray();

//     // console.log(entries);

//     // entries.forEach((entry, index) => {
//     //     console.log(`Entry ${index + 1}:`, entry);
//     //   });

//     for (let i = 0; i < entries.length; i++) {
//         setTimeout(() => {
//           console.log(`Entry ${i + 1}:`, entries[i]);
//         }, i * 20); // Multiply by 100 to wait for 0.1 seconds
//       }

//   } finally {
//     await client.close();
//   }
// }