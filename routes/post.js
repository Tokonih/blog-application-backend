let express = require("express" )
let app = express.Router()
let Post = require('../model/post')
let Category = require('../model/category')
let User = require('../model/user')
let Comment = require('../model/comment')
// let upload = require("../middleware/upload")
const path = require("path")
const multer = require ("multer")

const storage = multer.diskStorage({
    destination: (req, res, cb)=> {
        cb(null, "./images")   
    },
    filename: (req, file, cb)=> {
        console.log(file)
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage: storage})

app.get("/posts", async function (req, res){
    try{
        let post = await Post.find().populate("user_id category_id comment_id")
        res.json(post)

    }catch(e){
        res.status(500).send(e.message)
    }
})

app.get("/posts/:id", async function (req, res){
    try{
        let { id } = req.params;
        let post = await Post.findById(id).populate("user_id category_id comment_id")

        res.send(post)

    }catch(e){
        res.status(500).send(e.message)
    }
})

app.post("/posts", upload.single("img"), async function (req, res){
    try{
        let {user_id, category_id} = req.body;

        let category = await Category.findById(category_id)
        let user = await User.findById(user_id)
   
        if(!user) return res.status(404).send({msg: "User doesn't exist"})
        if(!category) return res.status(404).send({msg: "Category doesn't exist"})

        let post = new Post(req.body);
        if(req.file){
          const { filename, originalname, size} = req.file;

          post.img = filename;
        }
   
        user.post_id.push(post._id)     
        await post.save()
        res.send(post)
    }catch(e){
        res.status(500).send(e.message)
    }
})


app.put("/posts/:id", async function (req, res){
    try{
        let { id } =req.params;

        let updatePost = req.body
        
        let result = await Post.findByIdAndUpdate(id, updatePost)

        if(!result){
            return res.status(400).json({msg: "Post does not exist"})
        }

        return res.json({msg : "Post updated Successfully"})
    }catch(e){
        res.status(500).send(e.message)
    }
})

app.delete("/posts/:id", async function (req, res){
    try{
        let { id } = req.params;
        let result = await Post.findByIdAndDelete(id)  

        if(!result){
            return res.status(404).json({msg: "Post Not Found "})
        }

        return res.json({msg: "Delete Successful"})
    }catch(e){
        res.status(500).send(e.message)
    }
})
module.exports = app