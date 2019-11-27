// @ts-check
// contactController.js
// Import contact model
const Attendence = require('../model/attendence.model');
const math = require('mathjs');
const nodeExcel = require('excel-export');



exports.get = async function (req, res) {


     let snapshot = await Attendence.get({
        subject : req.body.subject,
        teacher : req.body.teacher,
        className : req.body.className,
        year : req.body.year
        //timestamp : { $gte : new Date(req.body.timestamp+"T00:00:00.000Z"),$lt: new Date(req.body.timestamp+"T24:00:00.000Z")}
    });
    console.log(snapshot);
    var conf ={};
    conf.name = "mysheet";
  	conf.cols = [{
		caption:'UID',
        type:'string',
        width:35
	},{
		caption:'Name',
        type:'string',
        width:45
    }];

    let att = [];
    await snapshot.forEach((data)=>{
        conf.cols.push(
            {
                caption:data['timestamp'].toLocaleDateString(),
                type:'string',
                width:45
            }
        )

        att.push(data['attendence']);
        
    });
    let row =[];
    let name =snapshot[0]['name'];
    let uid = snapshot[0]['uid'];
console.log(name.uid);
    for(let i=0;i<name.length;i++){
        let tempRow = [];
        tempRow.push(name[i]);
        tempRow.push(uid[i]);
        for(let j=0;j<att.length;j++){
            tempRow.push(att[j][i]);
        }
        row.push(tempRow);
    }

    conf.rows = row
  	var result = nodeExcel.execute(conf);
  	res.setHeader('Content-Type', 'application/vnd.openxmlformats');
  	res.setHeader("Content-Disposition", "attachment; filename=" + req.body.teacher+"_"+req.body.subject+"_"+req.body.className+"_"+req.body.year+"_Attendence.xlsx");
  	res.end(result, 'binary');
    
};
// Handle create contact actions
exports.put = async function (req, res) {

    var attendence = new Attendence({
        subject : req.body.subject,
        teacher : req.body.teacher,
        className : req.body.className,
        year : req.body.year,
        name : req.body.name,
        uid : req.body.uid,
        attendence : req.body.attendence
    });

    let cDate = new Date().getUTCFullYear()+"-"+(new Date().getUTCMonth()+1)+"-"+new Date().getUTCDate();
    const data = await Attendence.findOne({timestamp : { $gte : new Date(cDate+"T00:00:00.000Z"),$lt: new Date(cDate+"T24:00:00.000Z")}});
    if(data == null){
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
    }
    else{

        console.log(data['attendence']);
        console.log(req.body.attendence);
        let attendenceData = math.or(req.body.attendence,data['attendence']);  
        let resp =await Attendence.findOneAndUpdate({timestamp : { $gte : new Date(cDate+"T00:00:00.000Z"),$lt: new Date(cDate+"T24:00:00.000Z")}},
        {attendence:attendenceData});
        res.json({
            message: 'Attendence Updated!'
        });
    }
    };

// save the contact and check for errors


