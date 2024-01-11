let express = require("express")
let app = express.Router()
let Post = require("../model/post")
let User = require("../model/user")
let Like = require("../model/like")

app.post("/like", async function (req, res){
    try{
            let {user_id, post_id} = req.body;

            let user = await User.findById(user_id)
            let post = await Post.findById(post_id)

            if(!user) return res.status(404).send({msg: "User does not exist"})
            if(!post) return res.status(404).send({msg: "Post does not exist"})

            let like = new Like(req.body)
            like.liked = true 
            await like.save()

            post.like_id.push(like._id)
            await post.save()

            res.send(like)
    }catch(e){
        res.status(500).send(e.message)
    }
})

app.post("/unlike", async function (req, res){
    try{
        const { user_id, post_id } = req.body;

        const like = await Like.findByIdAndRemove({user_id, post_id})

        if(!like){
            return res.status(400).send({msg: "Post not found"})
        }

        res.send({msg: "Post unliked"})
    }catch(err){
        res.status(500).send(err.message)
    }
})



module.exports = app