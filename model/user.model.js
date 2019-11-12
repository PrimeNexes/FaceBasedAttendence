// @ts-check
// userModel.js
var mongoose = require('mongoose');
// Setup schema

var dataSchema = new mongoose.Schema({
        uid: {
            type: Number,
            required: true
        },
        name: {
            type: String,
            required: true
        },
    className: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    }});

// Export User model
var User = module.exports = mongoose.model('User', dataSchema);

module.exports.get = async function (find) {
    console.log(find);
    const give = [];
    give.push('none');
    const data = await User.find(find).sort({"uid":0});
    data.forEach((snapshot)=>{
        give.push(snapshot.toJSON().uid);
    });
    console.log(give);
    return give;//Display the comments returned by MongoDB, if any were found. Executes after the query is complete.
}