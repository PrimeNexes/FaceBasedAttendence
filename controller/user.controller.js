// @ts-check
// contactController.js
// Import contact model
const User = require('../model/user.model');
// Handle index actions
exports.login = function (req, res) {
    let user = User.get({className:req.body.className,year:req.body.year});
    console.log(user);
};
// Handle create contact actions
exports.register = function (req, res) {
    var user = new User({
        className : req.body.className,
        year : req.body.year,
        name : req.body.name,
        uid : req.body.uid
    });
// save the contact and check for errors
    user.save(function (err) {
        if (err)
            {
                res.json(err);
            }
        else{
        res.json({
            message: 'New User created!',
            data: user
        });
    }
    });
};

// Handle view contact info
// exports.view = function (req, res) {
//     Contact.findById(req.params.contact_id, function (err, contact) {
//         if (err)
//             res.send(err);
//         res.json({
//             message: 'Contact details loading..',
//             data: contact
//         });
//     });
// };
// // Handle update contact info
// exports.update = function (req, res) {
// Contact.findById(req.params.contact_id, function (err, contact) {
//         if (err)
//             res.send(err);
// contact.name = req.body.name ? req.body.name : contact.name;
//         contact.gender = req.body.gender;
//         contact.email = req.body.email;
//         contact.phone = req.body.phone;
// // save the contact and check for errors
//         contact.save(function (err) {
//             if (err)
//                 res.json(err);
//             res.json({
//                 message: 'Contact Info updated',
//                 data: contact
//             });
//         });
//     });
// };
// // Handle delete contact
// exports.delete = function (req, res) {
//     Contact.remove({
//         _id: req.params.contact_id
//     }, function (err, contact) {
//         if (err)
//             res.send(err);
// res.json({
//             status: "success",
//             message: 'Contact deleted'
//         });
//     });
// };