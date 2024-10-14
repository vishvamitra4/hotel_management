import React, { createContext } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const [user , setUser] = React.useState(null);
    const [isAdmin , setIsAdmin] = React.useState(null);


    // verification of usertoken and updating the user..
    const fetchUserData = async (userToken)=>{
        try{
            const {data} =  await axios.post("/profile", {
                userToken
            });
            localStorage.setItem("user" , JSON.stringify(data.data.user));
            setUser(data.data.user);
            setIsAdmin(data.data.flag);
        }catch(e){
            localStorage.clear();
            alert(e.response.data.error.message);
        };
    };

    return(
        <UserContext.Provider value={{user , setUser , isAdmin , setIsAdmin , fetchUserData}}>
            {children}
        </UserContext.Provider>
    )
}