import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { UserData } from "../context/UserContext";
// import { PostData } from "../context/PostContext";

const Login = () => {
  const [emaildata, setEmaildata] = useState("");
  const [passworddata, setPassworddata] = useState("");
  const navigate = useNavigate();
  const[allposts,setallposts]=useState([])
  const[allvideos,setallvideos]=useState([])
    const MyProfile =async () => {
        
        const response2=await axios.get("http://localhost:3000/getallposts")
        console.log(response2.data.posts)
        setallposts(response2.data.posts)
        setallvideos(response2.data.reels)
         
        
      };
       useEffect(()=>{
        MyProfile()
       },[])
      // useEffect(()=>{
      //   MyProfile()
      // },[])
//   const { loginUser, loading } = UserData();
//   const { fetchPosts } = PostData();

  const submitHandler =async (e) => {
    e.preventDefault();
    console.log(emaildata,passworddata)
    const response=await axios.post("http://localhost:3000/login",{emaildata,passworddata})
     console.log(response.data.message)
     console.log(response.data.userVal)
     MyProfile()
     if(response.data.message=="Invalid Credentials"){
     alert("Invalid Credentials")
     navigate("/register")
     }
     if(response.data.message=="User Logged in"){
         alert("User Logged in")
     navigate("/")

         } 
  };
  return (
    <>
      {/* {loading ? (
        <h1>Loading...</h1>
      ) : ( */}
 <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-500 to-pink-500">
  <div className="flex flex-col md:flex-row shadow-lg rounded-lg max-w-4xl w-[90%] bg-white">
    
    {/* Left/Main Section (Form) */}
    <div className="w-full md:w-2/3 p-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Welcome Back!
      </h1>
      <form onSubmit={submitHandler} className="space-y-6">
        <input
          type="email"
          className="custom-input w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
          placeholder="Email Address"
          value={emaildata}
          onChange={(e) => setEmaildata(e.target.value)}
          required
        />
        <input
          type="password"
          className="custom-input w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
          placeholder="Password"
          value={passworddata}
          onChange={(e) => setPassworddata(e.target.value)}
          required
        />
        <div className="text-center">
          <button className="auth-btn bg-purple-600 text-white rounded-md px-6 py-2 hover:bg-purple-700 transition duration-200">
            Login
          </button>
        </div>
      </form>

      {/* Forgot Password Link */}
      <div className="text-center mt-4">
        <Link to="/forgot-password" className="text-purple-600 hover:underline">
          Forgot Password?
        </Link>
      </div>

      {/* Mobile View: Register Section */}
      <div className="md:hidden text-center mt-6 bg-gradient-to-r from-purple-600 to-pink-400 p-6 rounded-lg text-white">
        <h2 className="text-2xl font-semibold">New Here?</h2>
        <p className="mt-2">Join us and explore the community!</p>
        <Link
          to="/register"
          className="bg-white text-purple-600 rounded-full px-4 py-2 mt-4 inline-block hover:bg-gray-200 transition duration-200"
        >
          Register Now
        </Link>
      </div>
    </div>

    {/* Desktop View: Register Section */}
    <div className="hidden md:flex md:w-1/3 bg-gradient-to-b from-purple-600 to-pink-400 items-center justify-center rounded-r-lg">
      <div className="text-white text-center p-6">
        <h2 className="text-4xl font-semibold">New Here?</h2>
        <p className="mt-2">Join us and explore the community!</p>
        <Link
          to="/register"
          className="bg-white text-purple-600 rounded-full px-4 py-2 mt-4 inline-block hover:bg-gray-200 transition duration-200"
        >
          Register Now
        </Link>
      </div>
    </div>

  </div>
</div>

    </>
  );
};

export default Login;