var mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
    text :String,
    author: {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'User'
        },
        username:String
    }
    
});
// console.log('hi from the comment.js');
var Comment = mongoose.model("Comment",commentSchema);
module.exports = Comment;