// @ts-check
// api-routes.js
// Initialize express router
let router = require('express').Router();
// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub crafted with love!',
    });
});
// Import contact controller
var recogniseController = require('../controller/recognise.controller');
var trainController = require('../controller/train.controller');
// Contact routes

router.route('/recognise')
    .get(recogniseController.recognise);


router.route('/train')
    .post(trainController.train);


// router.route('/register/:contact_id')
//     .get(contactController.view)
//     .patch(contactController.update)
//     .put(contactController.update)
//     .delete(contactController.delete);
// Export API routes
module.exports = router;