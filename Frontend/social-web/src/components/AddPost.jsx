import React, { useEffect, useState } from "react";
 
import { LoadingAnimation } from "./Loading";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const AddPost = ({ typedata }) => {
    const navigate = useNavigate();
    const [user,setuser]=useState([])
  const[captiondata,setCaptiondata]=useState("")
  const[file,setFile]=useState("")
  const[typeVal,settypeVal]=useState(typedata ?typedata :"post")
  const[loadingAnimate,setLoadingAnimation]=useState(false)
     const MyProfile =async () => {
            const response=await axios.get("http://localhost:3000/myprofile", )
console.log(typedata)

            console.log(response.data)
            setuser(response.data)
             if(response.data.message=="Unauthorized" || response.data.message=="Please Login"){
    navigate("/login")
             }
            // console.log(response.data.userVal)
            
          };
  const submitHandler=async(e)=>{
setLoadingAnimation(true)

e.preventDefault();
const response=await axios.post("http://localhost:3000/post",{captiondata,file,typeVal}, {
    headers: { "Content-Type": "multipart/form-data" },
  })
console.log(response.data)
setLoadingAnimation(false)
setCaptiondata("")
setFile(" ")
  }
  useEffect(()=>{
    MyProfile()
  },[])
  return (
    <div className="bg-gradient-to-br from-[#f0f4ff] via-[#f7eaff] to-[#e0f7fa]  flex items-center justify-center pt-10 pb-16">
    <div className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-2xl max-w-lg w-full transition-all hover:shadow-indigo-200 animate-fadeIn">
      <h2 className="text-xl font-semibold text-indigo-700 mb-4 text-center">Create a New {typedata === 'post' ? "Post" : "Reel"}</h2>
      <form
        onSubmit={submitHandler}
        className="flex flex-col gap-5"
      >
        <input
          type="text"
          className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-300 placeholder:text-gray-500"
          placeholder="Write a caption..."
          value={captiondata}
          onChange={(e) => setCaptiondata(e.target.value)}
        />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          accept={typedata === "post" ? "image/*" : "video/*"}
          required
          name="file"
          className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-indigo-50 file:text-indigo-700
                    hover:file:bg-indigo-100 transition"
        />
        <button
          type="submit"
          disabled={loadingAnimate}
          className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-medium py-2 rounded-lg transition-all duration-300 shadow-md flex justify-center items-center"
        >
          {loadingAnimate ? <LoadingAnimation /> : "+ Add Post"}
        </button>
      </form>
    </div>
  </div>
  
  );
};

export default AddPost;