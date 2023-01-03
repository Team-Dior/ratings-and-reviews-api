const models = require('../models/reviews.js');

function getReviews(req, res) {
  console.log('request is ', req);
  models.getReviews(req.body, (err, result) => {
    if (err) {
      console.log('error')
      res.status(404).send();
    } else {
      res.status(200).send(result);
    }
  });
}

// function getReviews(req, res) {
//   console.log('request is ', req.body);
//   models.getReviews(req.body)
//     .then((result) => {
//       res.status(200).send(result);
//     })
//     .catch((err) => {
//       res.status(500).send(err);
//     });
// }

async function getMeta(req, res) {
  await models.getMeta((err, result) => {
    if (err) {
      console.log('error', err);
    } else {
      console.log('result in controllers ', result);
      res.status(200).send(result);
    }
  });
}

// function getMeta(req, res) {
//   models.getMeta()
//     .then((result) => {
//       res.status(200).send(result);
//     })
//     .catch((err) => {
//       res.status(500).send(err);
//     });
// }

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