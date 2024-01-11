const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    post_id:[{ type:mongoose.Schema.Types.ObjectId, ref:"posts"}],
    fullname:{type: String, required: true },
    email:{type:String, required:true, unique:true},
    phone:{type:String, required:true},
    password:{type:String, required:true},
    img:{type:String},
    created_at:{type:Date, default:()=>Date.now()},
    modified_at:{type:Date, default:()=>Date.now()}
})
const users = mongoose.model("users", UserSchema)

module.exports = users