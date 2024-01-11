let express = require("express")
let app = express.Router()
let Category = require("../model/category")


// GET CATEGORIES
app.get("/category", async function(req,res){
    try{
        let category = await Category.find()
        res.json(category)
    }catch(e){
        res.status(500).send(e.message)
    }
})


// GET CATEGORY BY ID 
app.get("/category/:id",async function (req, res){
    try{
        let { id } = req.params;
        let category = await Category.findById(id)
        res.send(category)
    }catch(e){
        res.status(500).send(e.message)
    }
})


// POST CATEOGRIES 
app.post("/category", async function (req, res){
    try{
        let category = new Category(req.body);
        await category.save()
        res.send(category)
    }catch(e){
        res.status(500).send(e.message)
    }
})



// EDID CATEGORY 
app.put("/category/:id", async function (req, res){
    try{
        let { id } = req.params;

        let UpdateCategory = req.body

        let result = await Category.findByIdAndUpdate(id, UpdateCategory) 

        if(!result){
            return res.status(404).json({msg: "Category not found"})
        }

        return res.json({msg: "Category Updated Successfully"})

    }catch(e){
        res.status(500).send(e.message)
    }
})


// DELETE CATEGORY
app.delete("/category/:id", async function (req,res){
    try{
            let { id } = req.params;
            let result = await Category.findByIdAndDelete(id)

            if(!result){
                return res.status(404).json({msg: "Category Not Found"})
            }

            return res.json({msg: "Delete Successfully "})
    }catch(e){
        res.status(500).send(e.message)
    }
})

module.exports = app