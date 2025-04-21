const mongoose=require("mongoose")
const dotenv=require("dotenv").config()
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("Connected To Mongoose !")
}).catch(()=>{
    console.log("Error In Connection !")
})