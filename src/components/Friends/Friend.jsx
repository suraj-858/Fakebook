import React from 'react'
import './style.scss'
import { useContext } from 'react'
import { contextUser } from '../context/UserContext'
import { useEffect } from 'react'
import axios from 'axios'
import { getAllUser } from '../../apiRoutes/ApiRoutes'
import { useState } from 'react'
import Profile from '../profile/Profile'


const Friend = () => {
const {mobileFriendList, chatProfile, chatProfileShow} = useContext(contextUser);
const [userArray, setUserArray] = useState([]);
const [allUserInfo, setAllUserInfo] = useState();


const config = {
  headers:{
    "auth-token": localStorage.getItem("token")
  } 
}

useEffect(() =>{

  const fetchAllUser = async() =>{
    const response = await axios.get(getAllUser, config );
   
    setUserArray(response.data);
    
  }
  fetchAllUser();

}, [])

const loggedInUserID = localStorage.getItem('userId');

const filteredUser = userArray.filter(user => user._id  !==  loggedInUserID);



  return (
    <>

    <div className={mobileFriendList ? "container-show":"container-hide"}>
     <div className='paragraph'>

     <div className="input-container">
            <input type="text" placeholder='Search Friends' />
        </div>
        
      <div className="user-show-bar">

        {filteredUser.map((user, index) =>{
          return(
            <div key={index} className="user-singlebar" onClick={() =>  {chatProfile(); setAllUserInfo(user)}} >
            <img src={`data:image/svg+xml;base64,${user.avatarImage}`} alt="" />
            <h4>{user.username}</h4>
            </div>
            
          )
        })}

      
      </div>
     </div>
     
    </div>
    {chatProfileShow ? (<Profile allUserInfo = {allUserInfo}/>): ""}
    
    </>
  )
}

export default Friend
