import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Videcallpage.css'
const Videocallpage = () => {
    const navigate=useNavigate()
    const[roomid,setroomid]=useState("")
    const generateRoomId=()=>{
        const roomidval=Math.random().toString(36).substring(2,9)
        const timestamp=Date.now().toString().substring(-4)
        setroomid(roomidval+timestamp)
    }
    const handleOne=()=>{
        if(!roomid){
            alert("First Generate Room Id")
            return
        }
            navigate(`/room/${roomid}?type=one-on-one-call`)
    }
    const handleGroup=()=>{
        if(!roomid){
            alert("First Generate Room Id")
            return
        }
        navigate(`/room/${roomid}?type=group-call`)
    }
  return (
     <>
      <div className='mainvideo'>
     <h1 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center gap-1 mb-10">Entertain Your Call...</h1>
      <div className="videobox">
        <input type="text" name="rndm" id="rndm" placeholder='Generated Id' value={roomid} readOnly/>
        <button onClick={generateRoomId} className='bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-4 py-2 rounded-full shadow-md transition-all duration-300 font-medium'>Generate</button>
      </div>
      <div className="bottombtn">
        <button disabled={!roomid} onClick={handleOne} className='bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-4 py-2 rounded-full shadow-md transition-all duration-300 font-medium'>Group</button>
        <button disabled={!roomid} onClick={handleGroup} className='bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-4 py-2 rounded-full shadow-md transition-all duration-300 font-medium'>One</button>
      </div>
    </div>
     </>
  )
}

export default Videocallpage
