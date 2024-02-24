require('dotenv').config()

const express = require('express');
const cors = require('cors');
const rainbowRoutes = require('./mongoRoutes');
const rainbowController = require('./mongoController')
const { Pool, Client } = require('pg');
const client = new Client()
await client.connect()

const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PORT,
});

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method, count)
    count++
    next()
})

app.use('/api/rainbows', rainbowRoutes)

const getMongoData = rainbowRoutes.get('/', async (req, res) => {
    try {
        const rainbows = await rainbowController.getLast();
        res.json(rainbows);
    } catch (error) {
        res.status(500).json({ error: error.message})
    }
})

getMongoData();


// // move data to pg
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

mongoose.connect(process.env.MONG_URI)
    .then(() => {
        app.listen(port, () => {
            console.log('connected to db & listening on port', port)
        })
    })
    .catch((error) => {
        console.log(error)
    })