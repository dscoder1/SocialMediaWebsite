const express=require("express")
const dotenv=require("dotenv")
dotenv.config()
const mongoose=require("mongoose")
const bcrypt=require("bcrypt")
const cors=require("cors")
const cookieParser=require("cookie-parser")
const jwt=require("jsonwebtoken")
const path=require("path")
const bodyParser=require("body-parser")
const multer=require("multer")
//const{app,server}=require('./socket/socket')

 const app=express()
app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use(bodyParser.json())
app.use(express.urlencoded({extended:false}))
const connection=require("./models/connection")
const user=require("./models/userModel")
const Post=require("./models/postModel")
const Chat=require("./models/chatModel")
const Messages=require("./models/messages")
const loginUser=require("./models/loginModel")
app.use("/files", express.static("files"));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./files");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + file.originalname);
    },
});


const upload = multer({ storage: storage });

app.get("/",async(req,res)=>{
    await res.send("Hello ! Check !")
})

const generateToken = (id, res) => {
    const token = jwt.sign({ id }, process.env.JWT_SEC, {
      expiresIn: "15d",
    });
  console.log(token)
    res.cookie("token", token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
  };


const isAuth = async (req, res, next) => {
  
    try {
      const data=await loginUser.findOne({})
  console.log(data)
      if (!data) return res.status(200).json({ message: "Unauthorized" });
  
  //     const decodedData = jwt.verify(token, process.env.JWT_SEC);
  
  //     if (!decodedData)
  //       return res.status(200).json({
  //         message: "Token Expired",
  //       });
  
      req.userVal = await loginUser.findById(data._id);
  console.log(req.userVal._id)
      next();
    } catch (error) {
      res.status(200).json({
        message: "Please Login",
      });
    }
  };
app.get("/myprofile",isAuth,async(req,res)=>{
  console.log(req.userVal.Id)
    const userVal = await user.findById(req.userVal.Id).select("-password");
  
    res.json(userVal);
  })

  app.get("/userprofile/:id",async(req,res)=>{
    const userVal = await user.findById(req.params.id).select("-password");
  
    if (!userVal)
      return res.status(404).json({
        message: "No User with is id",
      });
  
    res.json(userVal);
  })


app.post("/follow/:id",isAuth,async(req,res)=>{
  const userVal = await user.findById(req.params.id);
  const loggedInUser = await user.findById(req.userVal.Id);

  if (!userVal)
    return res.status(404).json({
      message: "No User with is id",
    });

  if (userVal._id.toString() === loggedInUser._id.toString())
    return res.status(400).json({
      message: "You can't follow yourself",
    });

  if (userVal.followers.includes(loggedInUser._id)) {
    const indexFollowing = loggedInUser.followings.indexOf(userVal._id);
    const indexFollower = userVal.followers.indexOf(loggedInUser._id);

    loggedInUser.followings.splice(indexFollowing, 1);
    userVal.followers.splice(indexFollower, 1);

    await loggedInUser.save();
    await userVal.save();

    res.json({
      message: "User Unfollowed",
    });
  } else {
    loggedInUser.followings.push(userVal._id);
    userVal.followers.push(loggedInUser._id);

    await loggedInUser.save();
    await userVal.save();

    res.json({
      message: "User Followed",
    });
  }
})


app.post("/followdata/:id",async(req,res)=>{
  const userVal = await user.findById(req.params.id)
  .select("-password")
  .populate("followers", "-password")
  .populate("followings", "-password");

const followers = userVal.followers;
const followings = userVal.followings;

res.json({
  followers,
  followings,
});
})
   
app.post("/update",isAuth,upload.single('file'),async(req,res)=>{
  const userVal = await user.findById(req.userVal.Id);

  // const { file } = req.file;
console.log(req.userVal.Id,req.file)
 // if (file) {
    userVal.profilePic = req.file.filename;
  //}
  await userVal.save();

  res.json({
    message: "Profile updated",
  });

})


app.post("/updatename",isAuth,upload.single('file'),async(req,res)=>{
  const userVal = await user.findById(req.userVal.Id);

  // const { file } = req.file;
console.log(req.userVal.Id,req.body.name)
 // if (file) {
    userVal.name = req.body.name;
  //}
  await userVal.save();

  res.json({
    message: "Profile updated",
  });

})


app.post("/updatepassword",isAuth,async(req,res)=>{
  const userVal = await user.findById(req.userVal.Id);

  const { oldPassword, newPassword } = req.body;

  const comparePassword = await bcrypt.compare(oldPassword, userVal.password);

  if (!comparePassword)
    return res.status(200).json({
      message: "Wrong old password",
    });

  userVal.password = await bcrypt.hash(newPassword, 10);

  await userVal.save();

  res.json({
    message: "Password Updated",
  });
}) 

const Server=require("socket.io")
const http=require("http")
const server = http.createServer(app);

const io =Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});


const getReciverSocketId = (reciverId) => {
  return userSocketMap[reciverId];
};

const userSocketMap = {};

io.on("connection", (socket) => {
  console.log("User Connected", socket.id);

  const userId = socket.handshake.query.userId;

  if (userId != "undefined") userSocketMap[userId] = socket.id;

  io.emit("getOnlineUser", Object.keys(userSocketMap)); //[1,2,3,4]

  socket.on("disconnect", () => {
    console.log("User disconnected");
    delete userSocketMap[userId];
    io.emit("getOnlineUser", Object.keys(userSocketMap));
  });
});



app.post("/sendmessages",isAuth,async(req,res)=>{
    const { recieverId, message } = req.body;
  
    const senderId = req.userVal.Id;
  
    if (!recieverId)
      return res.status(200).json({
        message: "Please give reciever id",
      });
  
    let chat = await Chat.findOne({
      users: { $all: [senderId, recieverId] },
    });
  
    if (!chat) {
      chat = new Chat({
        users: [senderId, recieverId],
        latestMessage: {
          text: message,
          sender: senderId,
        },
      });
  
      await chat.save();
    }
  
    const newMessage = new Messages({
      chatId: chat._id,
      sender: senderId,
      text: message,
    });
  
    await newMessage.save();
  
    await chat.updateOne({
      latestMessage: {
        text: message,
        sender: senderId,
      },
    });
  
    const reciverSocketId = getReciverSocketId(recieverId);
  
    if (reciverSocketId) {
      io.to(reciverSocketId).emit("newMessage", newMessage);
    }
  
    res.status(201).json(newMessage);
  });


app.post("/getAllMessages/:id",isAuth,async(req,res)=>{
    const { id } = req.params;
    const userId = req.userVal.Id;
  
    const chat = await Chat.findOne({
      users: { $all: [userId, id] },
    });
  
    if (!chat)
      return res.status(200).json({
        message: "No Chat with these users",
      });
  
    const messages = await Messages.find({
      chatId: chat._id,
    });
  
    res.json(messages);
  });


app.get("/getallchats",isAuth,async(req,res)=>{
  const chat=await Chat.find({users:req.userVal.Id}).populate({path:"users",
    select:"name profilePic"
  })
  if(chat){
    return res.status(200).send(chat)
  }
})

app.post("/post",isAuth,upload.single("file"),async(req,res)=>{
  const { captiondata,typeVal } = req.body;
console.log(req.body)
console.log(req.file)
  const ownerId = req.userVal.Id;
  let option;

   
  if (typeVal === "reel") {
    option = {
      resource_type: "video",
    };
  } else {
    option = {};
  }
  const post = await Post.create({
    caption:captiondata,
    post: req.file.filename,
    owner: ownerId,
    type:typeVal,
  });

  res.status(200).json({
    message: "Post created",
    post,
  });
})


app.post("/delete/:id",isAuth,async(req,res)=>{
    const post = await Post.findById(req.params.id);
  
    if (!post)
      return res.status(200).json({
        message: "No post with this id",
      });
  
    if (post.owner.toString() !== req.userVal.Id.toString())
      return res.status(200).json({
        message: "Unauthorized",
      });
  
  
    await post.deleteOne();
  
    res.json({
      message: "Post Deleted",
    });
  });


app.get("/getallposts",async(req,res)=>{
    const posts = await Post.find({ type: "post" })
      .sort({ createdAt: -1 })
      .populate("owner", "-password")
      .populate({
        path: "comments.user",
        select: "-password",
      });
  
    const reels = await Post.find({ type: "reel" })
      .sort({ createdAt: -1 })
      .populate("owner", "-password")
      .populate({
        path: "comments.user",
        select: "-password",
      });
  
    res.json({ posts, reels });
  });


app.post("/likeandunlikepost/:id",isAuth,async(req,res)=>{
  console.log(req.params.id)

    const post = await Post.findById(req.params.id);
    if (!post)
      return res.status(200).json({
        message: "No Post with this id",
      });
  
    if (post.likes.includes(req.userVal.Id)) {
      const index = post.likes.indexOf(req.userVal.Id);
  
      post.likes.splice(index, 1);
  
      await post.save();
  
      res.json({
        message: "Post Unlike",
      });
    } else {
      post.likes.push(req.userVal.Id);
  
      await post.save();
  
      res.json({
        message: "Post liked",
      });
    }
  });


  app.post("/addcomment/:id",isAuth,async(req,res)=>{

      const post = await Post.findById(req.params.id);
    
      if (!post)
        return res.status(404).json({
          message: "No Post with this id",
        });
    
      post.comments.push({
        user: req.userVal.Id,
        name: req.userVal.name,
        comment: req.body.comment,
      });
    
      await post.save();
    
      res.json({
        message: "Comment Added",
      });
    });
    
app.post("/deletecomment/:id",isAuth,async(req,res)=>{
    const post = await Post.findById(req.params.id);
  
    if (!post)
      return res.status(200).json({
        message: "No Post with this id",
      });
  
    if (!req.query.commentId)
      return res.status(200).json({
        message: "Please give comment id",
      });
  
    const commentIndex = post.comments.findIndex(
      (item) => item._id.toString() === req.query.commentId.toString()
    );
  
    if (commentIndex === -1) {
      return res.status(200).json({
        message: "Comment not found",
      });
    }
  
    const comment = post.comments[commentIndex];
  
    if (
      post.owner.toString() === req.userVal.Id.toString() ||
      comment.user.toString() === req.userVal.Id.toString()
    ) {
      post.comments.splice(commentIndex, 1);
  
      await post.save();
  
      return res.json({
        message: "Comment deleted",
      });
    } else {
      return res.status(200).json({
        message: "Yor are not allowed to delete this comment",
      });
    }
  });

app.post("/editcaption/:id",isAuth,async(req,res)=>{
    const post = await Post.findById(req.params.id);
  
    if (!post)
      return res.status(200).json({
        message: "No Post with this id",
      });
  
    if (post.owner.toString() !== req.userVal.Id.toString())
      return res.status(200).json({
        message: "You are not owner of this post",
      });
  
    post.caption = req.body.caption;
  
    await post.save();
  
    res.json({
      message: "post updated",
    });
  });

app.post("/register",upload.single("file"),async(req,res)=>{
    console.log(req.body)    
    console.log(req.file)

     const { fullnamedata,emaildata,passworddata,genderdata} = req.body;
    if (!fullnamedata || !emaildata || !passworddata || !genderdata) {
        return res.status(200).json({
          message: "Please give all values",
        });
      }
    
     let userVal = await user.findOne({ email:emaildata });
    
      if (userVal)
        return res.status(200).json({
          message: "User Already Exist",
        });
    
    
      const hashPassword = await bcrypt.hash(passworddata, 10);
     console.log(hashPassword)
      const data= await user.create({
        name:fullnamedata,
        email:emaildata,
        password:hashPassword,
        gender:genderdata,
        profilePic:req.file.filename
      });
    
      generateToken(data._id, res);
    
      res.status(200).json({
        message: "User Registered",
        user,
      });
}) 
app.post("/login",async(req,res)=>{
     
      const userVal = await user.findOne({ email:req.body.emaildata });
    console.log(userVal._id)
    console.log(userVal)
      if (!userVal)
        return res.status(200).json({
          message: "Invalid Credentials",
        });
    
      const comparePassword = await bcrypt.compare(req.body.passworddata, userVal.password);
    
      if (!comparePassword)
        return res.status(200).json({
          message: "Invalid Credentials",
        });
    await loginUser.deleteOne({})
      generateToken(userVal._id, res);
      const loginUserVal=await loginUser.create({
        Id:userVal._id,
        name:userVal.name,
        email:req.body.emaildata,
        password:req.body.passworddata
      })
      res.json({
        message: "User Logged in",
        userVal,
      });
})
 
app.get("/logout",async(req,res)=>{
  await loginUser.deleteOne({})
      res.json({
        message: "Logged out successfully",
      });
})
 
app.get("/getAllUsers",isAuth,async(req,res)=>{
  const search=req.query.search || ""
  const users=await user.find({
    name:{
      $regex:search,
      $options:"i"
    },
    _id:{$ne:req.userVal.Id}
  }).select("-password")
  if(users){
    return res.status(200).send(users)
  }
})

app.listen(process.env.PORT,()=>{
    console.log("Server Is Running On Port 3000")
})