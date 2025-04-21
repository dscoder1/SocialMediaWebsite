import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import NavigationBar from '../components/NavigationBar';
import { FaSearch } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Chat from '../components/chat/Chat';
import MessageContainer from '../components/chat/MessageContainer';
const ChatPage = () => {
    const [chats, setChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
  
    async function createChat(id) {
      try {
        const { data } = await axios.post(`http://localhost:3000/sendmessages`, {
          recieverId: id,
          message: "Hii",
        });
        console.log(data)
      } catch (error) {
        toast.error(error.response.data.message);
        console.log(error);
      }
    }
    const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState(false);

  async function fetchAllUsers() {
    try {
      const { data } = await axios.get(`http://localhost:3000/getAllUsers?search=${query}`);
console.log(data)
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  }
  const getAllChats = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3000/getallchats`);
      setChats(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, [query]);

  useEffect(() => {
    getAllChats();
  }, []);

  async function createNewChat(id) {
    console.log(id)
    await createChat(id);
    setSearch(false);
    getAllChats();
  }

 // const { onlineUsers, socket } = SocketData();
  return (
     <>
       <div className="w-[100%] md:w-[750px] md:p-4 bg-white">
      <div className="flex gap-4 mx-auto">
        <div className="w-[30%]">
          <div className="top">
            <button
              className="bg-blue-500 text-white px-3 py-1 rounded-full"
              onClick={() => setSearch(!search)}
            >
              {search ? "X" : <FaSearch />}
            </button>

            {search ? (
              <>
                <input
                  type="text"
                  className="custom-input mt-2"
                  style={{ width: "100px", border: "gray solid 1px" }}
                  placeholder="Enter name"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <div className="users">
                  {users && users.length > 0 ? (
                    users.map((e) => (
                      <div
                        key={e._id}
                        className="mt-3 bg-gray-500 rounded-md p-3 transition-all duration-300 hover:scale-[1.02]"
                      >
                        {/* User Info */}
                        <div
                          onClick={() => createNewChat(e._id)}
                          className="flex items-center gap-3 cursor-pointer"
                        >
                          <img
                            src={`http://localhost:3000/files/${e.profilePic}`}
                            alt=""
                            className="w-8 h-8 rounded-full"
                          />
                          <span className="text-white font-medium">{e.name}</span>
                        </div>

                        {/* Call Button */}
                        <button
                          //onClick={() => handleCallUser(e._id)}
                          className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white py-1 rounded-md text-sm transition-all duration-300 animate-fade-in"
                        >
                          📞 Call
                        </button>
                      </div>
                    ))
                  ) : (
                    <p>No Users</p>
                  )}
                </div>
              </>
            ) : (
              <div className="flex flex-col justify-center items-center mt-2">
                {chats.map((e) => (
                  <Chat
                    key={e._id}
                    chat={e}
                    setSelectedChat={setSelectedChat}
                    // isOnline={onlineUsers.includes(e.users[0]._id)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Chat Area */}
        {selectedChat === null ? (
          <div className="w-[70%] mx-20 mt-40 text-2xl">
            {/* Hello 👋 {user.name} select a chat to start conversation */}
          </div>
        ) : (
          <div className="w-[70%]">
            <MessageContainer selectedChat={selectedChat} setChats={setChats} />
          </div>
        )}
      </div>
    </div>
     <NavigationBar/>
     </>
  )
}

export default ChatPage
