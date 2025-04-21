import React, { useEffect, useState } from 'react'
import { BsChatFill, BsThreeDotsVertical } from "react-icons/bs";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { Loading, LoadingAnimation } from "./Loading";
import toast from "react-hot-toast";
import axios from "axios";
import SimpleModal from './SimpleModal';
import LikeModal from './LikeModal';
const PostCard = ({type,value,userVal}) => {
    const [isLike, setIsLike] = useState(false);
    const [show, setShow] = useState(false);
    const [comment, setComment] = useState("");
    const formatDate = format(new Date(value.createdAt), "MMMM do");
    const likeHandler = async() => {
        setIsLike(!isLike);
        console.log(value._id)
        const { data } = await axios.post(`http://localhost:3000/likeandunlikepost/${value._id}`);
        console.log(data)
      };
      const addCommentHandler =async (e) => {
        e.preventDefault();
          try {
            const { data } = await axios.post(`http://localhost:3000/addcomment/${value._id}`,{
              comment,
            });
            toast.success(data.message);
            setComment("");
            setShow(false);
          } catch (error) {
            toast.error(error.response.data.message);
          }
        }
      
    
      const [showModal, setShowModal] = useState(false);
      const closeModal = () => {
        setShowModal(false);
      };
      const [open, setOpen] = useState(false);
  const oncloseLIke = () => {
    setOpen(false);
  };
  useEffect(() => {
    for (let i = 0; i < value.likes.length; i++) {
      if (value.likes[i] === userVal._id) setIsLike(true);
    }
  }, [value, userVal._id]);
 
   

  const deleteHandler = async() => {
    const response=await axios.post(`http://localhost:3000/delete/${value._id}`)
    console.log(response.data)
  };
  const [showInput, setShowInput] = useState(false);
  const editHandler = () => {
    setShowModal(false);
    setShowInput(true);
  };

  const [caption, setCaption] = useState(value.caption ? value.caption : "");
  const [captionLoading, setCaptionLoading] = useState(false);

  async function updateCaption() {
    setCaptionLoading(true);
    try {
      const { data } = await axios.post(`http://localhost:3000/editcaption/${value._id}`, { caption });

      toast.success(data.message);
     // fetchPosts();
      setShowInput(false);
      setCaptionLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setCaptionLoading(false);
    }
  }
 

 // const { onlineUsers } = SocketData();


  return (
     <>
       <div className="bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center pt-10 pb-16 px-4">
  <SimpleModal isOpen={showModal} onClose={() => setShowModal(false)}>
    <LikeModal isOpen={open} onClose={oncloseLIke} id={value._id} />
    <div className="flex flex-col items-center justify-center gap-4">
      <button
        onClick={editHandler}
        className="bg-indigo-500 hover:bg-indigo-600 text-white py-1 px-4 rounded-md transition"
      >
        Edit
      </button>
      <button
        onClick={deleteHandler}
        className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded-md transition"
      >
        Delete
      </button>
    </div>
  </SimpleModal>

  <div className="bg-bg-gradient-to-br from-[#f0f4ff] via-[#f7eaff] to-[#e0f7fa]  backdrop-blur-md p-6 rounded-2xl shadow-2xl max-w-4xl w-full transition hover:shadow-indigo-200">
    {/* Flex container for left and right sections */}
    <div className="flex gap-8">

      {/* Left Section - User info, Image, Like and Comments */}
      <div className="flex-1">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <Link to={`/user/${value.owner._id}`} className="flex items-center gap-3">
            <img
              src={`http://localhost:3000/files/${value.owner.profilePic}`}
              alt="user"
              className="w-12 h-12 rounded-full object-cover border-2 border-white shadow"
            />
            <div>
              <p className="font-semibold text-indigo-700">{value.owner.name}</p>
              <p className="text-gray-400 text-xs">{formatDate}</p>
            </div>
          </Link>
          {value.owner._id === userVal._id && (
            <button onClick={() => setShowModal(true)} className="text-gray-600 hover:text-indigo-500">
              <BsThreeDotsVertical size={20} />
            </button>
          )}
        </div>

        {/* Media (Image or Video) */}
        <div className="rounded-lg overflow-hidden mb-4">
          {type === "post" ? (
            <img
              src={`http://localhost:3000/files/${value.post}`}
              alt="post"
              className="w-full h-auto object-cover rounded-md"
            />
          ) : (
            <video
              src={`http://localhost:3000/files/${value.post}`}
              controls
               className="w-full min-h-[500px] max-h-[700px] md:w-[600px] lg:w-[700px] xl:w-[800px] object-cover rounded-2xl shadow-2xl transition-transform duration-500 hover:scale-105"
            />
          )}
        </div>

        {/* Reactions (Like, Comments count) */}
        <div className="flex justify-between items-center text-gray-600 mb-4">
          <div className="flex items-center gap-2">
            <span onClick={likeHandler} className="cursor-pointer text-xl text-red-500">
              {isLike ? <IoHeartSharp /> : <IoHeartOutline />}
            </span>
            <button
              onClick={() => setOpen(true)}
              className="text-sm hover:underline"
            >
              {value.likes.length} likes
            </button>
          </div>
          <button
            onClick={() => setShow(!show)}
            className="flex items-center gap-1 hover:text-indigo-600 text-sm"
          >
            <BsChatFill />
            {value.comments.length} comments
          </button>
        </div>
      </div>

      {/* Right Section - Caption and Comments */}
      <div className="flex-1">
        {/* Caption Section */}
        <div className="mb-4">
          {showInput ? (
            <div className="flex gap-2 items-center">
              <input
                className="border border-gray-300 p-2 rounded-md text-sm w-full focus:ring-2 focus:ring-indigo-400"
                placeholder="Edit Caption"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
              />
              <button
                onClick={updateCaption}
                disabled={captionLoading}
                className="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 rounded-md"
              >
                {captionLoading ? <LoadingAnimation /> : "Update"}
              </button>
              <button
                className="bg-red-400 text-white px-2 py-1 rounded-md"
                onClick={() => setShowInput(false)}
              >
                X
              </button>
            </div>
          ) : (
            <p className="text-gray-700">{value.caption}</p>
          )}
        </div>

        {/* Add Comment */}
        {show && (
          <form
            onSubmit={addCommentHandler}
            className="flex items-center gap-3 mb-4"
          >
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write a comment..."
              className="flex-1 border border-gray-300 p-2 rounded-md text-sm focus:ring-2 focus:ring-indigo-300"
            />
            <button
              type="submit"
              className="bg-indigo-100 hover:bg-indigo-200 px-4 py-2 rounded-md text-indigo-700 text-sm"
            >
              Add
            </button>
          </form>
        )}

        {/* Comments List */}
        <div className="border-t pt-4">
          <p className="text-gray-800 font-semibold mb-2">Comments</p>
          <div className="space-y-3 max-h-[180px] overflow-y-auto">
            {value.comments.length > 0 ? (
              value.comments.map((e) => (
                <Comment
                  key={e._id}
                  value={e}
                  userVal={userVal}
                  owner={value.owner._id}
                  id={value._id}
                />
              ))
            ) : (
              <p className="text-gray-500 text-sm">No comments yet.</p>
            )}
          </div>
        </div>
      </div>

    </div>
  </div>
</div>

       
     </>
  )
};

export default PostCard
export const Comment = ({ value, userVal, owner, id }) => {
  const deleteCommentHandler = async () => {
    try {
      const { data } = await axios.post(
        `http://localhost:3000/deletecomment/${id}?commentId=${value._id}`
      );
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting comment");
    }
  };

  const canDelete = owner === userVal._id || value.user._id === userVal._id;

  return (
    <div className="flex items-start gap-3">
      <Link to={`/user/${value.user._id}`}>
        <img
          src={`http://localhost:3000/files/${value.user.profilePic}`}
          alt="comment user"
          className="w-8 h-8 rounded-full object-cover"
        />
      </Link>
      <div className="flex-1">
        <p className="font-semibold text-gray-800">{value.user.name}</p>
        <p className="text-sm text-gray-600">{value.comment}</p>
      </div>
      {canDelete && (
        <button onClick={deleteCommentHandler} className="text-red-500">
          <MdDelete />
        </button>
      )}
    </div>
  );
};
