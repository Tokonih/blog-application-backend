const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    user_id:{type:String, require:true, ref: "users"},
    post_id: {type:String, require:true, ref: "posts"},
    comment: {type:String,  require:true, unique:true},
    created_at:{type:Date, default:()=>Date.now()},
    modified_at:{type:Date, default:()=>Date.now()}
})

const Comment = mongoose.model("comment", CommentSchema);

module.exports = Comment;