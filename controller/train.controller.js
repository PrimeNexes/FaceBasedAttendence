// @ts-check
// contactController.js
// Import contact model
const Train = require('../model/recognise.model');
let PythonShell = require('python-shell')
// Handle index actions
exports.train= function (req, res) {
    let pyshell =PythonShell.PythonShell.run('python/trainer.py',null,function (err, results) {
        if (err) throw err;
      });
    pyshell.on('message', function (message) {
        res.json({results:message})
      });
};
