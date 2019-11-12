// @ts-check
// contactController.js
// Import contact model
let PythonShell = require('python-shell')
// Handle index actions
exports.recognise = function (req, res) {
  
  const User = require('../model/user.model');
  let year = req.body.year;
  let className = req.body.className;
  User.get({className:req.body.className,year:req.body.year}).then(function(snapshot){
    let argument = [year,className,snapshot];
    let options = {
      args: argument,
    };
    console.log("Begin Recognition");
    PythonShell.PythonShell.run('python/recognizer.py',options,function (err, results) {
        if (err) res.json(err);
        res.json({results:results});
    });
    console.log("Recognition Ended");
  })


};




