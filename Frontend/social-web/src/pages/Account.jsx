import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import PostCard from '../components/PostCard';
import { FaArrowDownLong, FaArrowUp } from 'react-icons/fa6';
import Modal from '../components/Modal';
import { CiEdit } from "react-icons/ci";
import toast from 'react-hot-toast';
import {
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  FacebookIcon,
  GabShareButton,
  HatenaShareButton,
  InstapaperShareButton,
  LineShareButton,
  LinkedinShareButton,
  LinkedinIcon,
  LivejournalShareButton,
  MailruShareButton,
  OKShareButton,
  PinterestShareButton,
  PinterestIcon,
  PocketShareButton,
  RedditShareButton,
  TelegramShareButton,
  ThreadsShareButton,
  TumblrShareButton,
  TwitterShareButton,
  ViberShareButton,
  VKShareButton,
  WhatsappShareButton,
  WhatsappIcon,
  WorkplaceShareButton,
} from "react-share";
import { BsSendCheck } from 'react-icons/bs';
const Account = () => {
  const navigate = useNavigate();
  const [user,setuser]=useState([])
  const[allposts,setallposts]=useState([])
    const[allvideos,setallvideos]=useState([])
    const[filterposts,setfilterposts]=useState([])
    let myPosts;
    let myReels;

     const MyProfile =async () => {
            const response=await axios.get("http://localhost:3000/myprofile", )
            setuser(response.data)
             const response2=await axios.get("http://localhost:3000/getallposts")
                    setallposts(response2.data.posts)
                    setallvideos(response2.data.reels)
                    setfilterposts(response2.data.posts)
                    
                    
             if(response.data.message=="Unauthorized" || response.data.message=="Please Login"){
    navigate("/login")
             }
            
          };
          const [type, setType] = useState("post");
          const logoutHandler = async() => {
            const response=await axios.get("http://localhost:3000/logout", )
            navigate("/login")
          };
          const postHandler = async() => {
            
            navigate("/addposts")
          };
          const [index, setIndex] = useState(0);

  const prevReel = () => {
    if (index === 0) {
      return null;
    }
    setIndex(index - 1);
  };
  const nextReel = () => {
    if (index === myReels.length - 1) {
      return null;
    }
    setIndex(index + 1);
  };

  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);

  const [followersData, setFollowersData] = useState([]);
  const [followingsData, setFollowingsData] = useState([]);
   
                    async function followData() {
                      try {
                        const response = await axios.post(`http://localhost:3000/followdata/${user._id}`);
                        setFollowersData(response.data.followers);
                        setFollowingsData(response.data.followings);
                      } catch (error) {
                        console.log(error);
                      }
                    }
                  
                    useEffect(() => {
                      followData();
                    }, [user]);
          useEffect(()=>{
            const interval=setInterval(()=>{
                MyProfile();
              },1000)
              return()=>clearInterval(interval)
                },[])


                const [showInput, setShowInput] = useState(false);
  const [name, setName] = useState(user.name ? user.name : "");

  const UpdateName = async() => {
  const response = await axios.post(`http://localhost:3000/updatename`, {name});
  setName(name)
  setShowInput(false)
  };

  const [showUpdatePass, setShowUpdatePass] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [file, setFile] = useState("");
 

  const changleImageHandler =async () => {

    const response = await axios.post(`http://localhost:3000/update`, {file},{
      headers: { "Content-Type": "multipart/form-data" },
    });
    setFile(null);

  };       

  async function updatePassword(e) {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:3000/updatepassword`, {
        oldPassword,
        newPassword,
      });
      if(response.data.message=="Wrong old password"){
        alert("Wrong old password")
      }
      if(response.data.message=="Password Updated"){
        alert("Password Updated")
      }
      console.log(response.data.message)
      toast.success(response.data.message);
      setOldPassword("");
      setNewPassword("");
      setShowUpdatePass(false);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
  const shareUrl=window.location.href
  return (
    <>
 <div className="bg-gradient-to-br from-[#f0f4ff] via-[#f7eaff] to-[#e0f7fa] min-h-screen py-10 px-4 flex flex-col items-center gap-6 font-sans animate-fadeIn">
  {/* Followers/Following Modals */}
  {show && <Modal value={followersData} setShow={setShow} title={"Followers"} />}
  {show1 && <Modal value={followingsData} setShow={setShow1} title={"Followings"} />}

  {/* Profile Card */}
  <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl transition-all hover:shadow-indigo-300 p-8 max-w-4xl w-full flex flex-col sm:flex-row items-center gap-8 animate-slideInUp">
    {/* Image + Upload */}
    <div className="flex flex-col items-center gap-4">
      <img
        src={`http://localhost:3000/files/${user.profilePic}`}
        alt="User"
        className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-lg transition-transform duration-300 hover:scale-105"
      />
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="text-sm"
      />
      <button
        onClick={changleImageHandler}
        className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-4 py-2 rounded-full shadow-md transition-all duration-300 font-medium"
      >
        Update Profile
      </button>
    </div>

    {/* User Info */}
    <div className="flex-1 flex flex-col gap-3">
      {showInput ? (
        <div className="flex gap-2 items-center">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Name"
            className="border border-gray-300 rounded-lg p-2 w-40 focus:ring-2 focus:ring-indigo-400"
          />
          <button
            onClick={UpdateName}
            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md transition"
          >
            ✅
          </button>
          <button
            onClick={() => setShowInput(false)}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
          >
            ❌
          </button>
        </div>
      ) : (
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center gap-1">
          {user.name}
          <button onClick={() => setShowInput(true)} className="text-indigo-500 hover:text-indigo-700">
            <CiEdit size={20} />
          </button>
        </h2>
      )}
      <p className="text-sm text-gray-600">{user.email}</p>
      <p className="text-sm text-gray-600 capitalize">{user.gender}</p>

      <p
        className="text-sm text-blue-600 hover:underline cursor-pointer"
        onClick={() => setShow(true)}
      >
        {user.followers?.length || 0} Followers
      </p>
      <p
        className="text-sm text-blue-600 hover:underline cursor-pointer"
        onClick={() => setShow1(true)}
      >
        {user.followings?.length || 0} Followings
       
      </p>
{/* <p className='text-sm'>Share Via</p>           */}
<p>
<FacebookShareButton url={shareUrl}>
  <FacebookIcon size={42} round={true} className='mr-4'/>
</FacebookShareButton>
<WhatsappShareButton url={shareUrl}>
  <WhatsappIcon size={42} round={true} className='mr-4'/>
</WhatsappShareButton>
<PinterestShareButton url={shareUrl}>
  <PinterestIcon size={42} round={true} className='mr-4'/>
</PinterestShareButton>
<LinkedinShareButton url={shareUrl}>
  <LinkedinIcon size={42} round={true} className='mr-4'/>
</LinkedinShareButton>
<EmailShareButton url={shareUrl}>
  <EmailIcon size={42} round={true} className='mr-4'/>
</EmailShareButton>
</p>
      <button
        onClick={logoutHandler}
        className="mt-4 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-5 py-2 rounded-full transition-all shadow-md font-medium"
      >
        Logout
      </button>
      <button
        onClick={postHandler}
        className="mt-4 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-5 py-2 rounded-full transition-all shadow-md font-medium"
      >
        + Add Post
      </button>
    </div>
  </div>

  <button
    onClick={() => setShowUpdatePass(!showUpdatePass)}
    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-full shadow-md transition duration-300 font-medium"
  >
    {showUpdatePass ? "Cancel" : "Update Password"}
  </button>

  {showUpdatePass && (
    <form
      onSubmit={updatePassword}
      className="bg-white/90 backdrop-blur-lg rounded-xl p-6 shadow-lg flex flex-col gap-4 max-w-md w-full animate-fadeIn"
    >
      <input
        type="password"
        placeholder="Old Password"
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
        className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-400"
        required
      />
      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-400"
        required
      />
      <button
        type="submit"
        className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold py-2 rounded-md shadow"
      >
        Submit
      </button>
    </form>
  )}

  <div className="flex gap-6 mt-8 bg-white/80 backdrop-blur-sm px-8 py-3 rounded-full shadow-md animate-slideInDown">
    <button
      onClick={() => setType("post")}
      className={`text-sm font-semibold px-4 py-1 rounded-full ${
        type === "post"
          ? "bg-indigo-600 text-white"
          : "text-gray-600 hover:bg-gray-100"
      } transition`}
    >
      Posts
    </button>
    <button
      onClick={() => setType("reel")}
      className={`text-sm font-semibold px-4 py-1 rounded-full ${
        type === "reel"
          ? "bg-indigo-600 text-white"
          : "text-gray-600 hover:bg-gray-100"
      } transition`}
    >
      Reels
    </button>
  </div>

  <div className="mt-6 w-full max-w-4xl animate-fadeInSlow">
    {type === "post" ? (
      allposts?.filter((post) => post.owner._id === user._id).length > 0 ? (
        allposts
          .filter((post) => post.owner._id === user._id)
          .map((post) => (
            <PostCard key={post._id} type="post" value={post} userVal={user} />
          ))
      ) : (
        <p className="text-gray-500 text-center">No Posts Yet</p>
      )
    ) : allvideos?.filter((reel) => reel.owner._id === user._id).length > 0 ? (
      allvideos
        .filter((reel) => reel.owner._id === user._id)
        .map((reel, index) => (
          <div
            key={reel._id}
            className="flex gap-4 justify-center items-center mb-6"
          >
            <PostCard type="reel" value={reel} userVal={user} />
            <div className="flex flex-col gap-4 items-center">
              {index !== 0 && (
                <button
                  onClick={prevReel}
                  className="bg-gray-600 hover:bg-gray-700 text-white p-3 rounded-full shadow"
                >
                  <FaArrowUp />
                </button>
              )}
              {index !== allvideos.length - 1 && (
                <button
                  onClick={nextReel}
                  className="bg-gray-600 hover:bg-gray-700 text-white p-3 rounded-full shadow"
                >
                  <FaArrowDownLong />
                </button>
              )}
            </div>
          </div>
        ))
    ) : (
      <p className="text-gray-500 text-center">No Reels Yet</p>
    )}
  </div>
</div>

 <NavigationBar/>

    </>
  )
}

export default Account
