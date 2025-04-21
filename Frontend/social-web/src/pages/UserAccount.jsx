import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowDownLong, FaArrowUp } from "react-icons/fa6";
import axios from "axios";
import { Loading } from "../components/Loading";
import NavigationBar from "../components/NavigationBar";
import PostCard from "../components/PostCard";
import Modal from "../components/Modal";
 
const UserAccount = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [loading, setLoading] = useState(true);
    const [user,setuser]=useState([])
    const[allposts,setallposts]=useState([])
      const[allvideos,setallvideos]=useState([])
      const[loggedInUser,setloggedInUser]=useState([])
       
  
       const MyProfile =async () => {
              const response=await axios.get("http://localhost:3000/myprofile", )
             // console.log(response.data)
             setloggedInUser(response.data)
               const response2=await axios.get("http://localhost:3000/getallposts")
              // console.log(response2.data.posts)
                      setallposts(response2.data.posts)
                      setallvideos(response2.data.reels)
                      
               if(response.data.message=="Unauthorized" || response.data.message=="Please Login"){
      navigate("/login")
               }
              
            };
           
   
            useEffect(()=>{
              const interval=setInterval(()=>{
                  MyProfile();
                  fetchUser();
                },1000)
                return()=>clearInterval(interval)
                  },[])
                  
                  async function fetchUser() {
                    try {
                      const response= await axios.get("http://localhost:3000/userprofile/" + params.id);
                
                      setuser(response.data);
                      setLoading(false);
                    } catch (error) {
                      console.log(error);
                      setLoading(false);
                    }
//console.log(user)
                  }
                //   useEffect(() => {
                //     fetchUser();
                //   }, [params.id]);



                  const [type, setType] = useState("post");

                  const [index, setIndex] = useState(0);
                  let myPosts;
                  let myReels;
                  const prevReel = () => {
                    if (index === 0) {
                      console.log("null");
                      return null;
                    }
                    setIndex(index - 1);
                  };
                  const nextReel = (allvideos) => {
                    console.log(allvideos)
                    if (index === allvideos.length - 1) {
                      console.log("null");
                      return null;
                    }
                    setIndex(index + 1);
                  };
                
                   const [followed, setFollowed] = useState(false);
                
                //   const { followUser } = UserData();
                
                  const followHandler = async() => {
                    setFollowed(!followed);
                    const response=await axios.post("http://localhost:3000/follow/" + user._id)
                    console.log(response.data)
                    //followUser(user._id, fetchUser);
                  };
                
                    const followers = user.followers;
                

                    useEffect(()=>{
                        const interval=setInterval(()=>{
                            MyProfile();
                            fetchUser();
                          },1000)
                          return()=>clearInterval(interval)
                            },[])

                  useEffect(() => {
                    if (followers && followers.includes(loggedInUser._id)) setFollowed(true);
                  }, [user]);
                
                   const [show, setShow] = useState(false);
                   const [show1, setShow1] = useState(false);
                
                   const [followersData, setFollowersData] = useState([]);
                   const [followingsData, setFollowingsData] = useState([]);
                
                  async function followData() {
                    try {
                      const response = await axios.post(`http://localhost:3000/followdata/${user._id}`);
                console.log(response.data)
                      setFollowersData(response.data.followers);
                      setFollowingsData(response.data.followings);
                    } catch (error) {
                      console.log(error);
                    }
                  }
                
                  useEffect(() => {
                    followData();
                  }, [user]);
                  useEffect(() => {
                    fetchUser();
                  },[params.id]);


  return (
    <>
    <div className="bg-gray-100 min-h-screen flex flex-col gap-4 items-center justify-center pt-3 pb-14">
      {
        show && <Modal value={followersData} setShow={setShow} title={"Followers"}/>
      }
       {
        show1 && <Modal value={followingsData} setShow={setShow1} title={"Followings"}/>
      }
    <div className="bg-white flex justify-between gap-4 p-8 rounded-lg shadow-md max-w-md">
                  <div className="image flex flex-col justify-between mb-4 gap-4">
                  <img src={`http://localhost:3000/files/${user.profilePic}`} alt="User Image"  className="w-[180px] h-[180px] rounded-full" />
                    
                  </div>
                  <div className="flex flex-col gap-2">
                          <div className="flex justify-center gap-2 flex-col" >
                          <p className="text-gray-800 font-semibold">
                          {user.name}{" "}
                           
                        </p>
                      <p className="text-gray-500 text-sm">{user.email}</p>
                      <p className="text-gray-500 text-sm">{user.gender}</p>
                      <p className="text-gray-500 text-sm cursor-pointer" onClick={()=>{setShow(true)}}>
  {user.followers ? user.followers.length : 0} followers
</p>
<p className="text-gray-500 text-sm cursor-pointer" onClick={()=>{setShow1(true)}}>
  {user.followings ? user.followings.length : 0} followings
</p>
                      </div>
                      {user._id === loggedInUser._id ? (
                      ""
                    ) : (
                      <button
                        onClick={followHandler}
                        className={`py-2 px-5 text-white rounded-md ${
                          followed ? "bg-red-500" : "bg-blue-400"
                        }`}
                      >
                        {followed ? "UnFollow" : "Follow"}
                      </button>
                    )}
                      </div>

                  </div>
                  <div className="controls flex justify-center items-center bg-white p-4 rounded-md gap-7">
                    <button onClick={() => setType("post")}>Posts</button>
                    <button onClick={() => setType("reel")}>Reels</button>
                  </div>

                  {type === "post" && (
                    <>
                      {allposts && allposts.length > 0 ? (
  allposts
    .filter((post) => post.owner._id === user._id) // Filter posts based on user ID
    .map((e) => (
      <PostCard type={"post"} value={e} key={e._id} userVal={user} />
    ))
) : (
  <p>No Post Yet</p>
)}
                    </>
                  )}
                  {type === "reel" && (
                    <>
                      {allvideos && allvideos.length > 0 ? (
  // Filter the videos based on user ID
  allvideos
    .filter((reel) => reel.owner._id === user._id) // Filter reels based on user ID
    .map((filteredReel, index) => (
      <div key={filteredReel._id} className="flex gap-3 justify-center items-center">
        <PostCard
          type={"reel"}
          value={filteredReel}
          userVal={user}
        />
        <div className="button flex flex-col justify-center items-center gap-6">
          {index === 0 ? (
            ""
          ) : (
            <button
              className="bg-gray-500 text-white py-5 px-5 rounded-full"
              onClick={prevReel}
            >
              <FaArrowUp />
            </button>
          )}
          {index === allvideos.length - 1 ? (
            ""
          ) : (
            <button
              className="bg-gray-500 text-white py-5 px-5 rounded-full"
              onClick={nextReel(allvideos)}
            >
              <FaArrowDownLong />
            </button>
          )}
        </div>
      </div>
    ))
) : (
  <p>No Reels Yet</p>
)}
                    </>
                  )}
                  </div>
<NavigationBar/>
    </>
  )
}

export default UserAccount
