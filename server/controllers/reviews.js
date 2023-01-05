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
      res.status(404).send();
    } else {
      res.status(200).send(result);
    }
  });
}

function postReview(req, res) {
  const testData = {product_id:5, rating:2, summary:"big summary", body:"body text", recommend:true, name:"kyle", email:"kyl@email.com", photos:["urlplaceholder/review_5_photo_number_1.jpg", "urlplaceholder/review_5_photo_number_2.jpg"], characteristics:{"14": 5, "15":5} };
  models.postReview(testData, (err, result) => {
    if (err) {
      console.log('error');
      res.status(404).send();
    } else {
      res.status(201).send();
    }
  });
}

function putHelpful(req, res) {
  models.putHelpful(req.params, (err, result) => {
    if (err) {
      console.log('error');
      res.status(404).send();
    } else {
      res.status(200).send();
    }
  });
}

function putReport(req, res) {
  models.putReport(req.params, (err, result) => {
    if (err) {
      console.log('error');
      res.status(404).send();
    } else {
      res.status(200).send();
    }
  });
}

module.exports = {getReviews, getMeta, postReview, putHelpful, putReport};