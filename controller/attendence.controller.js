// @ts-check
// contactController.js
// Import contact model
const Attendence = require('../model/attendence.model');
// Handle index actions
exports.get = function (req, res) {
    Attendence.get({
        subject : req.body.subject,
        professor : req.body.professor,
        className : req.body.className,
        year : req.body.year,
        name : req.body.name
    }).then((snapshot)=>{
        res.json(snapshot);
    });
    
};
// Handle create contact actions
exports.put = function (req, res) {
    var attendence = new Attendence({
        subject : req.body.subject,
        professor : req.body.professor,
        className : req.body.className,
        year : req.body.year,
        name : req.body.name,
        attendence : req.body.attendence
    });
// save the contact and check for errors
    attendence.save(function (err) {
        if (err)
            {
                res.json(err);
            }
        else{
        res.json({
            message: 'Attendence Record Added !',
            data: attendence
        });
    }
    });
};

