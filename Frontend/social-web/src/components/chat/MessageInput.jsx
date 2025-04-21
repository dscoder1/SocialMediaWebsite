import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
//import {ChatData} from '.../context/UserContext'
 
const MessageInput = ({ setMessages, selectedChat }) => {
    const [textMsg, setTextMsg] = useState("");
   // const { setChats } = ChatData();
  
    const handleMessage = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.post(`http://localhost:3000/sendmessages`, {
          message: textMsg,
          recieverId: selectedChat.users[0]._id,
        });
        setMessages((message) => [...message, data]);
        setTextMsg("");
        setChats((prev) => {
          const updatedChat = prev.map((chat) => {
            if (chat._id === selectedChat._id) {
              return {
                ...chat,
                latestMessage: {
                  text: textMsg,
                  sender: data.sender,
                },
              };
            }
  
            return chat;
          });
  
          return updatedChat;
        });
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      }
    };
  return (
   <>
  <div className="bg-gray-50 min-h-screen py-4">
  <div className="flex flex-col bg-white p-5 rounded-lg shadow-lg max-w-4xl mx-auto my-6">
    <form onSubmit={handleMessage} className="flex items-center justify-between gap-4">
      {/* Input field */}
      <input
        type="text"
        placeholder="Enter Message"
        className="border border-gray-300 rounded-lg p-3 w-[80%] focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"
        value={textMsg}
        onChange={(e) => setTextMsg(e.target.value)}
        required
      />
      
      {/* Send Button */}
      <button
        type="submit"
        className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 transition-all duration-300 ease-in-out"
      >
        Send
      </button>
    </form>
  </div>
</div>


   </>
  )
}

export default MessageInput
