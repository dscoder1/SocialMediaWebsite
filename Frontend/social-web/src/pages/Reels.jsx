import React, { useEffect, useState } from 'react'
import AddPost from '../components/AddPost'
import NavigationBar from '../components/NavigationBar'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PostCard from '../components/PostCard';
import { FaArrowUp, FaArrowDownLong } from "react-icons/fa6";
import { Loading } from "../components/Loading";

const Reels = () => {
  const navigate = useNavigate();
    const[isAuth,setisAuth]=useState(true)
    const[allposts,setallposts]=useState([])
    const[allvideos,setallvideos]=useState([])
        const [user,setuser]=useState([])
    
    const[index,setIndex]=useState(0)
      const MyProfile =async () => {
          const response=await axios.get("http://localhost:3000/myprofile")
          setuser(response)
          const response2=await axios.get("http://localhost:3000/getallposts")
          console.log(response2.data.posts)
          setallposts(response2.data.posts)
          setallvideos(response2.data.reels)
           if(response.data.message=="Unauthorized" || response.data.message=="Please Login"){
            setisAuth(false)
  navigate("/login")
           }
          // console.log(response.data.userVal)
          
        };
      useEffect(()=>{
                        const interval=setInterval(()=>{
                            MyProfile();
                          },1000)
                          return()=>clearInterval(interval)
                            },[])
      // useEffect(()=>{
      //   MyProfile();
      // },[])
        
  const prevReel = () => {
    if (index === 0) {
      console.log("null");
      return null;
    }
    setIndex(index - 1);
  };
  const nextReel = () => {
    if (index === allvideos.length - 1) {
      console.log("null");
      return null;
    }
    setIndex(index + 1);
  };
  return (
     <>
     <AddPost typedata="reel"/>
     <div className="bg-gradient-to-br from-indigo-100 to-pink-100 min-h-screen py-10">
  <div className="flex justify-center items-center gap-4 w-full px-4">
    {/* Reels Container */}
    <div className="flex flex-col items-center gap-8 w-full max-w-[600px]">

      {/* Reel Display */}
      {allvideos && allvideos.length > 0 ? (
        <PostCard
          key={allvideos[index]._id}
          value={allvideos[index]}
          type={"reel"}
          userVal={user}
        />
      ) : (
        <p className="text-gray-700 text-center font-semibold text-xl">No reels yet</p>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center w-full gap-6">
        {/* Previous Reel Button */}
        {index === 0 ? (
          <div></div>
        ) : (
          <button
            className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 px-6 rounded-full shadow-xl transition-transform transform hover:scale-110 hover:bg-indigo-700"
            onClick={prevReel}
          >
            <FaArrowUp size={24} />
          </button>
        )}

        {/* Next Reel Button */}
        {index === allvideos.length - 1 ? (
          <div></div>
        ) : (
          <button
            className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 px-6 rounded-full shadow-xl transition-transform transform hover:scale-110 hover:bg-indigo-700"
            onClick={nextReel}
          >
            <FaArrowDownLong size={24} />
          </button>
        )}
      </div>
    </div>
  </div>
</div>

     <NavigationBar/>
     </>
  )
}

export default Reels
