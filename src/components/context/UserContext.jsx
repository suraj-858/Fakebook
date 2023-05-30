import { useState } from "react";
import { createContext } from "react";

export const contextUser = createContext();

export const UserContext = ({children}) =>{

    //function to show mobile friendlist in mobile view
    const [mobileFriendList, setMobileFriendList] = useState(false);

    const mobileFriendShow = () =>{
        if(!mobileFriendList){
            setMobileFriendList(true);
            setMobileMessageList(false);
            setProfileShow(false);
            setUserInboxShow(false);
            setChatProfileShow(false);

        }else{
            setMobileFriendList(false);
        }

    }
    //function 1 end

    //function to show mobile messagelist in mobile view
    const [mobileMessageList, setMobileMessageList] = useState(false)

    const mobileMessageShow = () =>{
        if(!mobileMessageList){

            setMobileMessageList(true);
            setMobileFriendList(false);
            setProfileShow(false)
            setUserInboxShow(false);
            setChatProfileShow(false);

        }else{
            setMobileMessageList(false);


        }

    }
    //function 2 end

    //function to show profile section in home page
    const [profileShow, setProfileShow] = useState(false);

    const profilePictureShow = () =>{
        if(!profileShow){
            setProfileShow(true)
            setMobileMessageList(false);
            setMobileFriendList(false);
            setUserInboxShow(false);
            setChatProfileShow(false);

        }else{
            setProfileShow(false);
        }

    }
    //function 3 end

    //function to show the inbox of user
    const [userInboxShow , setUserInboxShow] = useState(false);
    const userInbox = () =>{
        if(!userInboxShow){
            setUserInboxShow(true);
            setProfileShow(false)
            setMobileMessageList(false);
            setMobileFriendList(false);
            setChatProfileShow(false);

        }
        else{
            setUserInboxShow(false);
        }

    }
    //function 4 end
    const [chatProfileShow, setChatProfileShow] = useState(false);
    const chatProfile = () =>{
        if(!chatProfileShow){
            setChatProfileShow(true);
            setUserInboxShow(false);
            setProfileShow(false)
            setMobileMessageList(false);
            setMobileFriendList(false);

        }
        else{
            setChatProfileShow(false);
        }

    }
    
    return(
<contextUser.Provider value={{chatProfileShow, chatProfile, userInbox, userInboxShow, mobileFriendList, mobileFriendShow, mobileMessageShow, mobileMessageList, profileShow, profilePictureShow}}>
    {children}
</contextUser.Provider>
)}

