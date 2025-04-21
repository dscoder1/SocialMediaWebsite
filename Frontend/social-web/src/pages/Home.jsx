import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import NavigationBar from '../components/NavigationBar';
import AddPost from '../components/AddPost';
import PostCard from '../components/PostCard';

const Home = () => {
  const navigate = useNavigate();
  const[isAuth,setisAuth]=useState(true)
  const[allposts,setallposts]=useState([])
  const[allvideos,setallvideos]=useState([])
    const [user,setuser]=useState([])
    const MyProfile =async () => {
        const response=await axios.get("http://localhost:3000/myprofile")
        setuser(response.data)
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
      //   MyProfile()
      // },[])
  return (
     <>
     <AddPost typedata="post" />
     {allposts && allposts.length > 0 ? (
            allposts.map((e) => <PostCard value={e} key={e._id} type={"post"} userVal={user}/>)
          ) : (
            <p>No Post Yet</p>
          )}
      <NavigationBar/>
     </>
  )
}

export default Home
