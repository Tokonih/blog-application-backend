let express = require("express")
let app = express.Router()
let User = require("../model/user")
let Post = require("../model/post")

// Get ALL Users
app.get("/users", async function (req,res){
    try{
        let users = await User.find();
        res.json(users)
    }catch(err){
        res.status(500).send(err.message)
    }
})

// Get user by ID
app.get("/users/:id", async function(req, res){
    try{
        let{ id } = req.params;
        let user = await User.findById(id).populate("post_id")
        res.send(user)
    }catch(e){
        res.status(500).send(e.message)
    }
})

// Create User
app.post("/users", async function(req, res){
    try{
        let user = new User(req.body);
        await user.save()
        res.send(user)
    }catch(e){
        res.status(500).send(e.message)
    }
})

// Get all posts from a user
app.get("/user/:id/posts", async function (req, res){
    try{
        let { id} = req.params;
        let user = await Post.find({user_id: id}).populate("user_id category_id")

        res.send(user)
    }catch(e){
        res.status(500).send(e.message)
    }
})



// app.get("/users/auth", async function(req, res){
//     try{
//         let users = await User.find();
//         res.json(users)
//     }catch(err){
//         res.status(500).send(err.message)
//     }
// })


// Edit user
app.put("/users/:id",async function(req,res){
    try{

        let { id } = req.params;

        let updatedUserData = req.body

        let result = await User.findByIdAndUpdate(id, updatedUserData)
        
        if(!result){
            return res.status(404).json({msg: "User not found"})
        }
    
        return res.json({msg: "User profile updated successfully "})
    }catch(e){
        res.status(500).send(e.message)
    }
})


// Delete User
app.delete("/users/:id", async function(req,res){
    try{
       let { id } = req.params;
       let result =  await User.findByIdAndDelete(id)

       if(!result) {
        return res.status(404).json({msg: "User not found "})
       }

       return res.json({msg: "Deleted successfully "})

    }catch(e){
        res.status(500).send(e.message)
    }

})

module.exports = app