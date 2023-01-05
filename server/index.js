const express = require('express');
const morgan  = require('morgan');
const cors = require('cors');
// require('dotenv').config();
const path = require('path');
require('dotenv').config({path: path.join(__dirname, '../.env')});

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const router = require('./router.js');

app.use(router);

const PORT = process.env.PORT ?? 8080;
app.listen(PORT, () => {
  console.log(`listening @ http://localhost:${PORT}`);
});
