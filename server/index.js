const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const routes = require('./routes');
const { authentication } = require('./middlewares/authMiddleware');



const app = express();

app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(authentication());




mongoose.set('strictQuery', false);
const connect = async () => {
  try {
    mongoose.connect(
      "mongodb+srv://newAniUser:AniTest@cluster0.vn3iex9.mongodb.net/recordme?retryWrites=true&w=majority",{}
    );
    console.log(`Connected to MongoDB`)
  } catch (error) {
    throw error;
  }
};

app.use(routes)

//-----Adding middleware-------
//Always! it returns a middleware which parse the url encoded body, this will be used for every request

app.listen(3030, () => {
  connect()
  console.log(`The server is running on Port 3030...`);
});
