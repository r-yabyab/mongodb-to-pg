const express = require("express");
const { getLast } = require('./mongoController');

const router = express.Router()

router.get('/last', getLast)

module.exports = router;