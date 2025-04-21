import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LoadingAnimation } from "../components/Loading";
import NavigationBar from '../components/NavigationBar';

const Search = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  async function fetchUsers() {
    setLoading(true);
    try {
        
    //   const { data } = await axios.get("/api/user/all?search=" + search);
      const response= await axios.get(`http://localhost:3000/getAllUsers?search=${search}`);
      console.log(response.data)
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  return (
    <>
     <div className="bg-gradient-to-br from-[#f0f4ff] via-[#f7eaff] to-[#e0f7fa]  min-h-screen flex justify-center items-center">
      <div className="search-container bg-white/80 backdrop-blur-lg p-6 rounded-lg shadow-2xl max-w-lg w-full">
        <div className="flex flex-col gap-4">
          <div className="search-bar flex justify-between items-center gap-4 mb-4">
            <input
              type="text"
              className="custom-input w-full p-3 rounded-lg text-gray-700 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter Name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              onClick={fetchUsers}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition duration-200 ease-in-out"
            >
              Search
            </button>
          </div>

          {loading ? (
            <LoadingAnimation />
          ) : (
            <>
              {users && users.length > 0 ? (
                <div className="user-list space-y-4">
                  {users.map((e) => (
                    <Link
                      key={e._id}
                      className="user-item bg-white hover:bg-indigo-100 px-4 py-3 rounded-md flex items-center gap-4 shadow-md transition duration-300 ease-in-out"
                      to={`/user/${e._id}`}
                    >
                      <img
                        src={`http://localhost:3000/files/${e.profilePic}`}
                        alt={e.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <p className="text-lg font-semibold text-gray-800">{e.name}</p>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500">No Users found. Please try searching again.</p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
    <NavigationBar/>
    </>

  );
};

export default Search;