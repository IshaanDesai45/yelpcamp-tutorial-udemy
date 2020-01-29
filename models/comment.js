var mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
    text :String,
    author: String
});
// console.log('hi from the comment.js');
var Comment = mongoose.model("Comment",commentSchema);
module.exports = Comment;