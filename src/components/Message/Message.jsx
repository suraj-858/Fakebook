import React, { useState } from 'react'
import './style.scss'
import { useContext } from 'react'
import { contextUser } from '../context/UserContext'
import SingleMessage from '../singleMessage/SingleMessage'
import ChatWindow from '../../components/chatWindow/ChatWindow'


function Message() {
  const {mobileMessageList, filteredUser} = useContext(contextUser)
  const [chatUserId, setChatUserId] = useState();
   console.log(chatUserId);
  return (
   <>
   
    <div className={mobileMessageList ? "message-container": "message-container-hide"}>
        <div className="message-header">
           <h3>Messages</h3>
        </div>
        <div className="message-container">
         {filteredUser.map((user, index) =>{
             
             return(<>
           <SingleMessage key={index} user = {user} setChatUserId = {setChatUserId} /> 
             </>)
         })}
      </div>

   </div> 
   <ChatWindow chatUserId = {chatUserId}/>
   </>
  )
}

export default Message
