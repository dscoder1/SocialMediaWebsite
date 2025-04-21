import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineHome, AiFillHome } from "react-icons/ai";
import { BsCameraReelsFill, BsCameraReels } from "react-icons/bs";
import { IoSearchCircleOutline, IoSearchCircle } from "react-icons/io5";
import {
  IoChatbubbleEllipses,
  IoChatbubbleEllipsesOutline,
} from "react-icons/io5";
import { RiAccountCircleFill, RiAccountCircleLine } from "react-icons/ri";
import { IoIosNotifications,IoIosNotificationsOutline } from "react-icons/io";

const NavigationBar = () => {
  const [tab, setTab] = useState(window.location.pathname);
  return (
    <div className="fixed bottom-0 w-full bg-white shadow-lg py-3">
    <div className="flex justify-around">
      <Link
        to={"/"}
        onClick={() => setTab("/")}
        className={`flex flex-col items-center text-2xl transition duration-200 ${
          tab === "/" ? "text-purple-600" : "text-gray-600"
        }`}
      >
        <span>{tab === "/" ? <AiFillHome /> : <AiOutlineHome />}</span>
        <span className="text-sm">Home</span>
      </Link>
      <Link
        to={"/reels"}
        onClick={() => setTab("/reels")}
        className={`flex flex-col items-center text-2xl transition duration-200 ${
          tab === "/reels" ? "text-purple-600" : "text-gray-600"
        }`}
      >
        <span>
          {tab === "/reels" ? <BsCameraReelsFill /> : <BsCameraReels />}
        </span>
        <span className="text-sm">Reels</span>
      </Link>
      <Link
        onClick={() => setTab("/search")}
        to={"/search"}
        className={`flex flex-col items-center text-2xl transition duration-200 ${
          tab === "/search" ? "text-purple-600" : "text-gray-600"
        }`}
      >
        <span>
          {tab === "/search" ? <IoSearchCircle /> : <IoSearchCircleOutline />}
        </span>
        <span className="text-sm">Search</span>
      </Link>
      <Link
        onClick={() => setTab("/notification")}
        to={"/notification"}
        className={`flex flex-col items-center text-2xl transition duration-200 ${
          tab === "/notification" ? "text-purple-600" : "text-gray-600"
        }`}
      >
        <span>
          {tab === "/notification" ? (
            <IoIosNotifications />
          ) : (
            <IoIosNotificationsOutline />
          )}
        </span>
        <span className="text-sm">Notification</span>
      </Link>
      <Link
        onClick={() => setTab("/chat")}
        to={"/chat"}
        className={`flex flex-col items-center text-2xl transition duration-200 ${
          tab === "/chat" ? "text-purple-600" : "text-gray-600"
        }`}
      >
        <span>
          {tab === "/chat" ? (
            <IoChatbubbleEllipses />
          ) : (
            <IoChatbubbleEllipsesOutline />
          )}
        </span>
        <span className="text-sm">Chat</span>
      </Link>
      <Link
        onClick={() => setTab("/account")}
        to={"/account"}
        className={`flex flex-col items-center text-2xl transition duration-200 ${
          tab === "/account" ? "text-purple-600" : "text-gray-600"
        }`}
      >
        <span>
          {tab === "/account" ? (
            <RiAccountCircleFill />
          ) : (
            <RiAccountCircleLine />
          )}
        </span>
        <span className="text-sm">Account</span>
      </Link>
    </div>
  </div>
  );
};

export default NavigationBar;