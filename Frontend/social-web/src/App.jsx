import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import { UserData } from './context/UserContext'
import Account from './pages/Account'
import NotFound from './components/NotFound'
import Reels from './pages/Reels'
import UserAccount from './pages/UserAccount'
import Search from './pages/Search'
import ChatPage from './pages/ChatPage'
import { SocketData } from './context/SocketContext'
import AddPost from './components/AddPost'
import Videocallpage from './components/VideoCallPage'
import Room from './components/Room'
import Notification from './components/Notification'

 
function App() {
  // const {onlineUsers}=SocketData()
  // console.log(onlineUsers)
// const {user}=UserData();
// console.log(user)
  return (
    <>
      <BrowserRouter>
      <Routes>
<Route path='/' element={<Home/>}/>
<Route path='/reels' element={<Reels/>}/>
<Route path='/login' element={<Login/>}/>
<Route path='/register' element={<Register/>}/>
<Route path='/account' element={<Account/>}/>
<Route path='/search' element={<Search/>}/>
<Route path='/chat' element={<ChatPage/>}/>
<Route path='/user/:id' element={<UserAccount/>}/>
<Route path='*' element={<NotFound/>}/>
<Route path='/addposts' element={<AddPost/>}/>
<Route path='/notification' element={<Notification/>}/>
<Route path='/videocalloption' element={<Videocallpage/>}/>
<Route path='/room/:roomid' element={<Room/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
