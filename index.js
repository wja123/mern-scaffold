require('dotenv').config()
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var express = require('express');
var path = require('path');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser')

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost/merrntodo';

var app = express()

app.use(express.static('./dist'));

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser())


app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist/index.html'));
})

var server = http.createServer(app)

mongoose.connect(MONGO_URI, (err) => {
  if (err) {
    console.log('DB Connection Error: ', err);
  } else {
    console.log('db Connected');
  }
})

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})
