const router = require('express').Router();
const controller = require('./controllers/reviews.js');

// router.get('/loaderio-e75786b9307ffbd8dc208dc579598a21/', (req, res) =>
//   res.send('loaderio-e75786b9307ffbd8dc208dc579598a21'));

router.get('/loaderio-6b4bc5cf9ca415c640f0a54b27b63cdb/', (req, res) =>
  res.send('loaderio-6b4bc5cf9ca415c640f0a54b27b63cdb'));

router.get('/reviews', controller.getReviews);
router.get('/reviews/meta', controller.getMeta);
router.post('/reviews', controller.postReview);
router.put('/reviews/:review_id/helpful', controller.putHelpful);
router.put('/reviews/:review_id/report', controller.putReport);

module.exports = router;