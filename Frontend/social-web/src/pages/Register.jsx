import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { UserData } from "../context/UserContext";
// import { PostData } from "../context/PostContext";

const Register = () => {
  const [fullnamedata, setNamedata] = useState("");
  const [emaildata, setEmaildata] = useState("");
  const [passworddata, setPassworddata] = useState("");
  const [genderdata, setGenderdata] = useState("");
  const [file, setFile] = useState("");

//   const { registerUser, loading } = UserData();

//   const { fetchPosts } = PostData();

//   const changeFileHandler = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();

//     reader.readAsDataURL(file);

//     reader.onloadend = () => {
//       setFilePrev(reader.result);
//       setFile(file);
//     };
//   };

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
  const submitHandler =async(e) => {
    e.preventDefault();
    console.log(fullnamedata,emaildata,passworddata,genderdata,file)
const response=await axios.post("http://localhost:3000/register",{fullnamedata,emaildata,passworddata,genderdata,file},
   {
       headers: { "Content-Type": "multipart/form-data" },
     })
console.log(response.data.message)
if(response.data.message=="User Already Exist"){
alert("User Already Exist Try With Another Email !")
}
if(response.data.message=="Please give all values"){
    alert("Please give all values")
    }
    if(response.data.message=="User Registered"){
        alert("User Registered")
        navigate("/login")
        }
  }
  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-500 to-pink-500">
  <div className="flex flex-col md:flex-row shadow-lg rounded-lg max-w-4xl w-[90%] bg-white">

    {/* Left/Form Section */}
    <div className="w-full md:w-2/3 p-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Register to Social Media
      </h1>
      <form onSubmit={submitHandler} className="space-y-6">
        <input
          type="file"
          className="custom-input w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
          onChange={(e) => { setFile(e.target.files[0]) }}
          accept="image/*"
          required
          name="file"
        />
        <input
          type="text"
          className="custom-input w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
          placeholder="User Name"
          value={fullnamedata}
          onChange={(e) => setNamedata(e.target.value)}
          required
        />
        <input
          type="email"
          className="custom-input w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
          placeholder="User Email"
          value={emaildata}
          onChange={(e) => setEmaildata(e.target.value)}
          required
        />
        <input
          type="password"
          className="custom-input w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
          placeholder="User Password"
          value={passworddata}
          onChange={(e) => setPassworddata(e.target.value)}
          required
        />
        <select
          className="custom-input w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
          value={genderdata}
          onChange={(e) => setGenderdata(e.target.value)}
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <div className="text-center mt-7">
          <button className="auth-btn bg-purple-600 text-white rounded-md px-6 py-2 hover:bg-purple-700 transition duration-200">
            Register
          </button>
        </div>
      </form>

      {/* Mobile View: Login CTA */}
      <div className="md:hidden text-center mt-8 bg-gradient-to-r from-purple-600 to-pink-400 p-6 rounded-lg text-white">
        <h2 className="text-2xl font-semibold">Already Have an Account?</h2>
        <p className="mt-2">Login to Social Media</p>
        <Link
          to="/login"
          className="bg-white text-purple-600 rounded-full px-4 py-2 mt-4 inline-block hover:bg-gray-200 transition duration-200"
        >
          Login
        </Link>
      </div>
    </div>

    {/* Desktop View: Login CTA */}
    <div className="hidden md:flex md:w-1/3 bg-gradient-to-b from-purple-600 to-pink-400 items-center justify-center rounded-r-lg">
      <div className="text-white text-center p-6">
        <h2 className="text-4xl font-semibold">Already Have an Account?</h2>
        <p className="mt-2">Login to Social Media</p>
        <Link
          to="/login"
          className="bg-white text-purple-600 rounded-full px-4 py-2 mt-4 inline-block hover:bg-gray-200 transition duration-200"
        >
          Login
        </Link>
      </div>
    </div>

  </div>
</div>

      {/* )} */}
    </>
  );
};

export default Register;