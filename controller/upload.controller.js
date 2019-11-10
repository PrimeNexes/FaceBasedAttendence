// @ts-check
// contactController.js
// Import contact model

// set file name as 2020.TYMCA.Name.FileName.png
let PythonShell = require('python-shell')
let multer  = require('multer')
var fs = require('fs');
// Handle index actions
exports.upload= function (req, res) {
    var multer  =   require('multer');  
    var storage =   multer.diskStorage({  
        destination: function (req, file, callback) {
            let str =  file.originalname.split('.');
            const dir = './python/dataset/'+str[0]+'/'+str[1]+'/'+str[2];  
            console.log(dir);
            if (!fs.existsSync(dir)){
                fs.mkdirSync(dir);
            }
            callback(null, dir);   
        },  
        filename: function (req, file, callback) {  
        let str =  file.originalname.split('.');
        console.log(str[3]+'.'+str[4]);
          callback(null, str[3]+'.'+str[4]);  
        }  
      });  
    var upload = multer({ storage : storage}).single('myfile');  
        
    //var upload = multer({ dest: 'uploads/' }).single('myfile');  
    upload(req,res,function(err) {  
        if(err) {  
            console.log(err);
            return res.end("Error uploading file.");  
        }  
        res.end("File is uploaded successfully!");  
    });  

};

exports.delete= function (req, res) {

}