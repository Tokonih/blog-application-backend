
const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
	category_id:{type:String,required:true,ref:"Categories"},
	user_id:{type:String,required:true,ref:"users"},
	comment_id:[{ type: mongoose.Schema.Types.ObjectId, ref: "comment"}],
	like_id:[{ type: mongoose.Schema.Types.ObjectId, ref: "like"}],
	title:{type:String,required:true},
	body:{type:String,required:true},
	img:{type:String },
	created_at:{type:Date, default:()=>Date.now()},
	modified_at:{type:Date, default:()=>Date.now()},
});

const Post = mongoose.model('posts', PostSchema);

module.exports = Post;