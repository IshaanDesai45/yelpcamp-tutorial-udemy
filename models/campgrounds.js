var mongoose = require('mongoose');
let Comment = require('./comment');


//campground schema setup
var campSchema = new mongoose.Schema({
    name:String,
    image:String,
    description:String,
    author:{
       id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
       },
       username:String
    },
    comments : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Comment'
        }
    ]
});

var campground = mongoose.model("campground",campSchema);

module.exports = campground ;