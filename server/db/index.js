require('dotenv').config();
const { Pool } = require('pg');

const db = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

db.connect(function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log('connected');
  }
});

module.exports = db;