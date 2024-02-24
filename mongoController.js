const mongoose = require('mongoose');
const Rainbow = require('./mongoModel');


const getLast = async (req, res) => {
    const rainbowsLast = await Rainbow.aggregate([
      // -1 = most recent first
      {
        '$sort': {
          'createdAt': -1
        }
      }, 
      // {
      //   '$limit': 25
      // }
    ])
    res.status(200).json(rainbowsLast)
  };

  module.exports = { getLast };