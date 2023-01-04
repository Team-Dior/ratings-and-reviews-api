const models = require('../models/reviews.js');

function getReviews(req, res) {
  console.log('request is ', req.query);
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
  console.log('request is ', req.query);
  models.getMeta(req.query, (err, result) => {
    if (err) {
      console.log('error', err);
    } else {
      res.status(200).send(result);
    }
  });
}

function postReview(req, res) {
  console.log('req body is ', req.body);
  models.postReview(req.body, (err, result) => {
    if (err) {
      console.log('error')
    } else {
      res.status(201).send();
    }
  });
}

function putHelpful(req, res) {
  console.log('request ', req.params);
  models.putHelpful(req.params, (err, result) => {
    if (err) {
      console.log('error')
    } else {
      res.status(200).send();
    }
  });
}

function putReport(req, res) {
  console.log('request ', req.params);
  models.putReport(req.params, (err, result) => {
    if (err) {
      console.log('error')
    } else {
      res.status(200).send();
    }
  });
}

module.exports = {getReviews, getMeta, postReview, putHelpful, putReport};