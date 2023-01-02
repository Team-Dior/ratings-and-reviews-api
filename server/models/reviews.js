const db = require('../db/index.js');

function getReviews(callback) {
  // const page = query.page || 1;
  // const count = query.count || 5;
  // const sort = query.sort || 'newest';
  // const product_id = query.product_id || 797894;
  const product_id = 797894;
  const queryString = `SELECT * FROM reviews WHERE product_id = ${product_id} LIMIT 5 OFFSET 1`;
  db.query(queryString, (err, result) => {
    if (err) {
      console.log('error is ', err);
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
}

function getMeta(callback) {
  db.query(queryString, (err, result) => {
    if (err) {
      console.log('error is ', err);
      callback(err, null);
    } else {
      callback(null, result);
    }
  })
}

function postReview(callback) {
  db.query(queryString, (err, result) => {
    if (err) {
      console.log('error is ', err);
      callback(err, null);
    } else {
      callback(null, result);
    }
  })
}

function putHelpful(callback) {
  db.query(queryString, (err, result) => {
    if (err) {
      console.log('error is ', err);
      callback(err, null);
    } else {
      callback(null, result);
    }
  })
}

function putReport(callback) {
  db.query(queryString, (err, result) => {
    if (err) {
      console.log('error is ', err);
      callback(err, null);
    } else {
      callback(null, result);
    }
  })
}

module.exports = {getReviews, getMeta, postReview, putHelpful, putReport};