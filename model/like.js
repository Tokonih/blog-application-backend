const mongoose = require("mongoose");

const LikeSchema = new mongoose.Schema({
    user_id: {type:String, require:true, ref:"users"},
    post_id: {type:String, require:true, ref:"posts"},
    liked: {type:Boolean, default: false,},
    created_at: {type:Date, default:()=>Date.now()},
})

const Like = mongoose.model("like", LikeSchema);

module.exports = Like