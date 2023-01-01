const db = require('../db/index.js');

function getReviews(callback) {
  const queryString = 'SELECT * FROM reviews WHERE id = 1';
  db.query(queryString, (err, result) => {

  })
}

function getMeta(callback) {
  db.query(queryString, (err, result) => {

  })
}

function postReview(callback) {
  db.query(queryString, (err, result) => {

  })
}

function putHelpful(callback) {
  db.query(queryString, (err, result) => {

  })
}

function putReport(callback) {
  db.query(queryString, (err, result) => {

  })
}

module.exports = {getReviews, getMeta, postReview, putHelpful, putReport};