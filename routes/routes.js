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
var userController = require('../controller/user.controller');
var uploadController = require('../controller/upload.controller');
var attendenceController = require('../controller/attendence.controller');
// Contact routes

router.route('/recognise')
    .post(recogniseController.recognise);


router.route('/train')
    .post(trainController.train);


router.route('/register')
    .post(userController.register);

router.route('/getuser')
    .post(userController.getUsers);

router.route('/upload').post(uploadController.upload)
router.route('/delete').post(uploadController.delete)

router.route('/getAttendence').post(attendenceController.get)

router.route('/putAttendence').post(attendenceController.put)
// Export API routes
module.exports = router;