require('dotenv').config()

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const rainbowRoutes = require('./mongoRoutes');
const rainbowController = require('./mongoController')
const { Pool, Client } = require('pg');
const client = new Client()
// await client.connect()

// const pool = new Pool({
//     user: process.env.PG_USER,
//     host: process.env.PG_HOST,
//     database: process.env.PG_DATABASE,
//     password: process.env.PG_PASSWORD,
//     port: process.env.PORT,
// });

const app = express();
const port = process.env.PORT || 4000

app.use(cors());
app.use(express.json());

// app.use((req, res, next) => {
//     // console.log(req.path, req.method, count)
//     count++
//     next()
// })




app.use('/api/rainbows', rainbowRoutes)

mongoose.connect(process.env.MONG_URI)
    .then(() => {
        app.listen(port, () => {
            console.log('connected to db & listening on port', port)
        })
    })
    .catch((error) => {
        console.log(error)
    })


app.get('/api/rainbows/last', async (req, res) => {
    try {
        res.json(rainbows);

        console.log(res);
        console.log(success)
    } catch (error) {
        // res.status(500).json({ error: error.message})
        console.log("error")
    }
})

// rainbowRoutes.get('/api/rainbows/last', rainbowController.getLast);


// // move data to pg
// create_schema_query = """
// CREATE TABLE IF NOT EXISTS messages (
//     id SERIAL PRIMARY KEY,
//     user_id INTEGER,
//     content TEXT
// );
// """
// cur.execute(create_schema_query)
// conn.commit()


// for message in messages_to_migrate:

// try {
//     await client.query('BEGIN')
//     const queryText = 'INSERT INTO rainbow(number, userID, timeSlept, activities, memo) VALUES ($1, $2, $3, $4, $5)'
//     const insertText = [res[0].numbers, res[0].userID, res[0].timeSlept, res[0].activities, res[0].memo]
//     await client.query(queryText, insertText)
//     await client.query('COMMIT')
// } catch (e) {
//     await client.query('ROLLBACK')
//     throw e
// } finally {
//     client.release()
// }





// const port = process.env.PORT || 3000;