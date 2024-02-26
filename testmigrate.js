require('dotenv').config()

const { Pool } = require('pg');
const pgPool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

const entry = [{
    _id: '65d9522acab0924c27cab692',
    number: 7.5,
    createdAt: '2024-02-24T02:19:22.822Z',
    updatedAt: '2024-02-24T02:19:22.822Z',
    __v: 0
}]

async function testSubmit() {   
          const pgClient = await pgPool.connect();
          try {
            const text = ('INSERT INTO submissions(_id, number, createdat, updatedat, __v) VALUES ($1, $2, $3, $4, $5)')
            const values = [entry[0]._id, entry[0].number, entry[0].createdAt, entry[0].updatedAt, entry[0]._v]
            const res = await pgClient.query(text, values)
            console.log(res.rows[0])
          } catch (error) {
            console.error('error')
          } finally {
            pgClient.release();
          }
      }

testSubmit();

// console.log(entry[0].__v)