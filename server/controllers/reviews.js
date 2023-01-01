const models = require('../models/reviews.js');

function getReviews(req, res) {
  models.getReviews((err, result) => {
    if (err) {
      console.log('error')
    } else {
      res.status(200).send(result);
    }
  });
}

function getMeta(req, res) {
  models.getMeta((err, result) => {
    if (err) {
      console.log('error')
    } else {
      res.status(200).send(result);
    }
  });
}

function postReview(req, res) {
  models.postReview((err, result) => {
    if (err) {
      console.log('error')
    } else {
      res.status(201).send();
    }
  });
}

function putHelpful(req, res) {
  models.putHelpful((err, result) => {
    if (err) {
      console.log('error')
    } else {
      res.status(200).send();
    }
  });
}

function putReport(req, res) {
  models.putReport(data, (err, result) => {
    if (err) {
      console.log('error')
    } else {
      res.status(200).send();
    }
  });
}

module.exports = {getReviews, getMeta, postReview, putHelpful, putReport};