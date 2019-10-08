// @ts-check
// contactController.js
// Import contact model
const Train = require('../model/recognise.model');
let PythonShell = require('python-shell')

// Handle index actions
exports.train= function (req, res) {
    let year = req.body.year;
    let className = req.body.className;
    let argument = [year,className];
    console.log(argument)
    let options = {
      args: argument,
    };
    let pyshell =PythonShell.PythonShell.run('python/trainer.py',options,function (err, results) {
        if (err) throw err;
        res.json({results:results})
      });

};
