// @ts-check
// Import express

let express = require('express');
// Import Body parser
let bodyParser = require('body-parser');
// Import Mongoose
let mongoose = require('mongoose');

const fileUpload = require('express-fileupload');
const cors = require('cors');
const morgan = require('morgan');
const _l = require('lodash');
const fs = require('fs');
// Initialize the app
let app = express();


// Import routes
let routes = require("./routes/routes")

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Connect to Mongoose and set connection variable
mongoose.connect('mongodb://localhost/SPIT',{ useNewUrlParser: true });


// Setup server port
var port = process.env.PORT || 8080;
// Allows cross-origin domains to access this API
app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin' , 'http://localhost:'+port);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append("Access-Control-Allow-Headers", "Origin, Accept,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    res.append('Access-Control-Allow-Credentials', 'true');
    next();
});

  
// Send message for default URL
app.get('/', (req, res) => res.send('Hello World with Express'));
// Use Api routes in the App
app.use('/api', routes);
     
// enable files upload
app.use(fileUpload({
    createParentPath: true
}));

//add other middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));

app.post('/delete', async (req, res) => {
    let className = req.body.className;
    let year = req.body.year;
    await fs.unlink('./python/recogCache/'+year+'/'+className+'/', (err) => {
        if (err) throw err;
        res.json('successfully deleted /'+year+'/'+className+'/');
      });
});

app.post('/upload-dataset', async (req, res) => {
    try {
        if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            let data = []; 
            //loop all files
            _l.forEach(_l.keysIn(req.files['photos']), (key) => {
                let photo = req.files['photos'][key];
                let str =  photo.name.split('.');
                const dir = './python/dataset/'+str[0]+'/'+str[1]+'/'+str[2]+'/'+str[3]+'.'+str[4];

                //move photo to uploads directory
                photo.mv(dir);
                
                //push file details
                data.push({
                    name: photo.name,
                    mimetype: photo.mimetype,
                    size: photo.size
                });
            });
    
            //return response
            res.send({
                status: true,
                message: 'Files are uploaded',
                data: data
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
});
app.post('/upload-recognise', async (req, res) => {
    console.log(__dirname);
    try {
        if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            let data = []; 
    
            //loop all files
            _l.forEach(_l.keysIn(req.files['photos']), (key) => {
                let photo = req.files['photos'][key];
                let str =  photo.name.split('.');
                let dir = './python/recogCache/'+str[0]+'/'+str[1]+'/'+str[2]+'.'+str[3];

                //move photo to uploads directory
                photo.mv(dir);

                //push file details
                data.push({
                    name: photo.name,
                    mimetype: photo.mimetype,
                    size: photo.size
                });
            });
    
            //return response
            res.send({
                status: true,
                message: 'Files are uploaded',
                data: data
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});
// Launch app to listen to specified port
app.listen(port, function () {
    console.log("Running RestHub on port " + port);
});