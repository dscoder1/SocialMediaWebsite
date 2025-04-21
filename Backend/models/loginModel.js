const conn=require("./connection")
const mongoose=require("mongoose")
const loginSchema = new mongoose.Schema(
  {
    Id:{
        type: String,
        required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    }, 
  },
  {
    timestamps: true,  
  }
);
module.exports=new mongoose.model("Login",loginSchema)