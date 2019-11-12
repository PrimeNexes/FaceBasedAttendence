// @ts-check
// contactController.js
// Import contact model
const User = require('../model/teacher.model');
// Handle index actions
exports.login = function (req, res) {
    User.get({username:req.body.username,password:req.body.password}).then((snapshot)=>{
        res.json(snapshot);
    });
    
};
// Handle create contact actions
exports.register = function (req, res) {
    var user = new User({
        username:req.body.username,
        password:req.body.password,
        name : req.body.name,
        subject : req.body.subject
    });
// save the contact and check for errors
    user.save(function (err) {
        if (err)
            {
                res.json(err);
            }
        else{
        res.json({
            message: 'New Account created!',
            data: user
        });
    }
    });
};
