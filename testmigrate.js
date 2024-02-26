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
    // _id: new ObjectId('65c5c893cab0924c27cab5f2'),
    number: 7.5,
    createdAt: '2024-02-24T02:19:22.822Z',
    updatedAt: '2024-02-24T02:19:22.822Z',
    __v: 0
}]

async function testSubmit() {
    const pgClient = await pgPool.connect();
    try {
        const text = ('INSERT INTO submissions(_id, userid, number, timeslept, activities, memo, createdat, updatedat, __v) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)')
        var stringed_id = entry[i]._id.toString()
        var stringedQuotes_id = "'" + stringed_id + "'"
        const values =
            [
                stringedQuotes_id,
                entry[i].userID,
                entry[i].number,
                entry[i].timeSlept,
                entry[i].activities,
                entry[i].memo,
                entry[i].createdAt,
                entry[i].updatedAt,
                entry[i]._v,
            ]
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