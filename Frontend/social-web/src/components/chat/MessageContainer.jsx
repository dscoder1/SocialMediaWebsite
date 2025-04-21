import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { LoadingAnimation } from '../Loading';
import Message from './Message';
import { useNavigate } from 'react-router-dom';
import MessageInput from './MessageInput';

const MessageContainer = ({selectedChat,setChats}) => {
    const [messages, setMessages] = useState([]);
 // const { user } = UserData();
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate();
  const[loggedInUser,setloggedInUser]=useState([])
  const MyProfile =async () => {
      const response=await axios.get("http://localhost:3000/myprofile", )
      setloggedInUser(response.data)
      console.log(response.data)
       if(response.data.message=="Unauthorized" || response.data.message=="Please Login"){
navigate("/login")
       }
      }
        useEffect(()=>{
                 //  const interval=setInterval(()=>{
                       MyProfile();
                    // },1000)
                    // return()=>clearInterval(interval)
                       },[])
 // const { socket } = SocketData();
    async function fetchMessages() {
        setLoading(true);
        try {
            console.log(selectedChat.users[0]._id)
          const { data } = await axios.post(
            `http://localhost:3000/getAllMessages/${selectedChat.users[0]._id}`
          );
    
          setMessages(data);
          setLoading(false);
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      }
    
      console.log(messages);
    
      useEffect(()=>{
        fetchMessages()
      },[selectedChat])
      const messageContainerRef = useRef(null);
      useEffect(() => {
        if (messageContainerRef.current) {
          messageContainerRef.current.scrollTop =
            messageContainerRef.current.scrollHeight;
        }
      }, [messages]);
  return (
    <div>
      {selectedChat && (
        <div className="flex flex-col">
          <div className="flex w-full h-12 items-center gap-3">
            <img
            src={`http://localhost:3000/files/${selectedChat.users[0].profilePic}`} 
              className="w-8 h-8 rounded-full"
              alt=""
            />
            <span>{selectedChat.users[0].name}</span>
          </div>
          {loading ? (
            <LoadingAnimation />
          ) : (
            <>
              <div
                ref={messageContainerRef}
                className="flex flex-col gap-4 my-4 h-[400px] overflow-y-auto border border-gray-300 bg-gray-100 p-3"
              >
                {messages &&
                  messages.map((e) => (
                    <Message
                      message={e.text}
                      ownMessage={e.sender === loggedInUser._id && true}
                    />
                  ))}
              </div>

              <MessageInput
                setMessages={setMessages}
                selectedChat={selectedChat}
              />
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default MessageContainer
