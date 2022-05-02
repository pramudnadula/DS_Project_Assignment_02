////Declare the variables
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 8070;
const URL = process.env.MONGODB_URL;
//const studentGroup = require('./Routes/StudentGroup')

// const cors = require('cors');
// const bodyparser = require('body-parser');


// app.use(cors());
// app.use(bodyparser.json());


////connect to mongoDB
mongoose.connect(URL, (err) => {
  if (err) throw err;
  console.log('connected to MongoDB');
});




////create server with port numebr 
app.listen(PORT, () => {
  console.log(`service is up and running on port ${PORT}`);
});
