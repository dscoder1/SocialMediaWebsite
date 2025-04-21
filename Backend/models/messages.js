const conn=require("./connection")
const mongoose=require("mongoose")

const messageSchema = new mongoose.Schema(
  {
    chatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
    },
    sender: { type: mongoose.Schema.Types.ObjectId, 
        ref: "User" },
    text: String,
  },
  {
    timestamps: true,
  }
);

module.exports =new mongoose.model("Messages", messageSchema);