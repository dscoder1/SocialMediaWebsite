import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BsSendCheck } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
const Chat = ({chat,setSelectedChat}) => {
    const navigate=useNavigate();
    const[loggedInUser,setloggedInUser]=useState([])
    const MyProfile =async () => {
        const response=await axios.get("http://localhost:3000/myprofile", )
        setloggedInUser(response.data)
        console.log(response.data)
         if(response.data.message=="Unauthorized" || response.data.message=="Please Login"){
navigate("/login")
         }
        }
        const handleCallUser=()=>{
//navigate("/videocalloption")
window.open('http://localhost:5173/videocalloption', '_blank');
        }
          useEffect(()=>{
                     const interval=setInterval(()=>{
                         MyProfile();
                       },1000)
                       return()=>clearInterval(interval)
                         },[])
    let user;
  if (chat) user = chat.users[0];
  return (
    <div>
      {user && (
        <div
          className="bg-white/80 backdrop-blur-sm py-3 px-4 rounded-lg shadow-lg cursor-pointer mt-3 hover:bg-indigo-100 transition duration-300 ease-in-out"
          onClick={() => setSelectedChat(chat)}
        >
          <div className="flex justify-between items-center gap-3">
            {/* Online Status (optional) */}
            {/* {isOnline && (
              <div className="text-2xl text-green-500">•</div>
            )} */}

            {/* User Info */}
            <div className="flex gap-3 items-center">
              <img
                src={`http://localhost:3000/files/${user.profilePic}`}
                alt=""
                className="w-10 h-10 rounded-full object-cover border-2 border-indigo-500 shadow-md"
              />
              <span className="font-semibold text-gray-800">{user.name}</span>
            </div>

            {/* Last message sent check */}
            <span className="text-gray-500 text-sm">
              {loggedInUser._id === chat.latestMessage.sender && (
                <BsSendCheck className="text-green-500" />
              )}
            </span>
          </div>

          {/* Last Message Preview */}
          <div className="mt-2">
            <span className="text-sm text-gray-600">
              {chat.latestMessage.text.length > 18
                ? `${chat.latestMessage.text.slice(0, 18)}...`
                : chat.latestMessage.text}
            </span>
          </div>

          {/* 📞 Call Button */}
          <div className="mt-3 animate-fade-in">
            <button
              onClick={(e) => {
                e.stopPropagation(); // prevent chat selection when calling
               // handleCallUser(user._id);
               handleCallUser();
              }}
              className="w-full bg-indigo-500 text-white py-1 rounded-md text-sm font-medium hover:bg-indigo-600 transition-all duration-300"
            >
              📞 Video Call
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Chat
