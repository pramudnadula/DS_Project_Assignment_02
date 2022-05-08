////Declare the variables
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 8070;
const URL = process.env.MONGODB_URL;
app.use('/uploads', express.static('uploads'));
const MovieRouter = require('./Routes/Movie')
const CategoryRouter = require('./Routes/Category')
const HallRouter = require('./Routes/MovieHall')
const ShowRouter = require('./Routes/Show')
const cors = require('cors');
const bodyparser = require('body-parser');
app.use(cors());
app.use(bodyparser.json());


////connect to mongoDB
mongoose.connect(URL, (err) => {
  if (err) throw err;
  console.log('connected to MongoDB');
});


app.use('/movies', MovieRouter)
app.use('/categories', CategoryRouter)
app.use('/hall', HallRouter)
app.use('/show', ShowRouter)


////create server with port numebr 
app.listen(PORT, () => {
  console.log(`service is up and running on port ${PORT}`);
});
