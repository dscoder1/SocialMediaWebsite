import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EndPoint = "http://localhost:3000";

const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
    const navigate=useNavigate();
    const[loggedInUser,setloggedInUser]=useState([])
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const MyProfile =async () => {
    const response=await axios.get("http://localhost:3000/myprofile", )
    setloggedInUser(response.data)
    console.log(response.data)
     if(response.data.message=="Unauthorized" || response.data.message=="Please Login"){
navigate("/login")
     }
    }
      useEffect(()=>{
                     MyProfile();
                     },[])
  useEffect(() => {
    const socket = io(EndPoint, {
      query: {
        userId: loggedInUser?._id,
      },
    });

    setSocket(socket);

    socket.on("getOnlineUser", (users) => {
      setOnlineUsers(users);
    });

    return () => socket && socket.close();
  }, [loggedInUser?._id]);
  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

export const SocketData = () => useContext(SocketContext);