let express = require("express")
let mongoose = require("mongoose")
let app = express()
let cors = require('cors')
require("dotenv").config()
let path = require("path")

let user = require("./routes/user")
let category = require("./routes/category")
let post = require("./routes/post")
let comment = require("./routes/comment")
let like = require("./routes/like")
// let upload = require("./middleware/upload")

let PORT = process.env.PORT || 9000;
app.use("/images", express.static(path.join(__dirname, "images")))

mongoose.connect(process.env.MONGO_URL, {   
    useNewUrlParser:true,
    useUnifiedTopology:true
});

mongoose.connection.on("open", ()=> console.log("server connected"))
mongoose.connection.on("error", (e)=> console.log(e))

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors(
    // {
    //     origin:"http://localhost:3000"
    // }sn
))

app.use("/api/v1",user)
app.use("/api/v1", category) 
app.use("/api/v1",  post) 
app.use("/api/v1", comment) 
app.use("/api/v1", like) 

app.listen(PORT)
console.log("App running on port " + PORT)