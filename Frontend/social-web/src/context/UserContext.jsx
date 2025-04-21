import React, { useContext } from 'react'
import axios from "axios";
import { createContext } from "react";
const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
return <UserContextProvider value={{User:"xyz"}}>{children}</UserContextProvider>
}

export const UserData=()=>useContext(UserContext)