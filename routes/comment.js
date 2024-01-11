let express = require("express")
let app = express.Router()
let Post = require("../model/post")
let User = require("../model/user")
let Comment = require("../model/comment")



app.post("/comment", async function (req, res){
    try{
        let {user_id, post_id} = req.body;

        let user = await User.findById(user_id)
        let post = await Post.findById(post_id)

        if(!user) return res.status(404).send({msg: "User does not exist"})
        if(!post) return res.status(404).send({msg: "Post does not exist "})

        let comment = new Comment(req.body);
        await comment.save();
        // res.send(comment);

        post.comment_id.push(comment._id);
        await post.save();
    
        res.send(comment);

    }catch(e){
        res.status(500).send(e.message)
    }
})

module.exports = app