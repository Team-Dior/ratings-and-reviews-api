const router = require('express').Router();
const controller = require('./controllers/reviews.js');

router.get('/reviews', controller.getReviews);
router.get('/reviews/meta', controller.getMeta);
router.post('/reviews', controller.postReview);
router.put('/reviews/:review_id/helpful', controller.putHelpful);
router.put('/reviews/:review_id/report', controller.putReport);

module.exports = router;