const models = require('../models/reviews.js');

function getReviews(req, res) {
  models.getReviews(req.query, (err, result) => {
    if (err) {
      console.log('error', err)
      res.status(404).send();
    } else {
      res.status(200).send(result);
    }
  });
}

function getMeta(req, res) {
  models.getMeta(req.query, (err, result) => {
    if (err) {
      console.log('error', err);
    } else {
      res.status(200).send(result);
    }
  });
}

function postReview(req, res) {
  models.postReview(req.body, (err, result) => {
    if (err) {
      console.log('error')
    } else {
      res.status(201).send();
    }
  });
}

function putHelpful(req, res) {
  models.putHelpful(req.params, (err, result) => {
    if (err) {
      console.log('error')
    } else {
      res.status(200).send();
    }
  });
}

function putReport(req, res) {
  models.putReport(req.params, (err, result) => {
    if (err) {
      console.log('error')
    } else {
      res.status(200).send();
    }
  });
}

module.exports = {getReviews, getMeta, postReview, putHelpful, putReport};