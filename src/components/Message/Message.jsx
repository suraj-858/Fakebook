import React from 'react'
import './style.scss'
import { useContext } from 'react'
import { contextUser } from '../context/UserContext'
import SingleMessage from '../singleMessage/SingleMessage'
import ChatWindow from '../../components/chatWindow/ChatWindow'


function Message() {
  const {mobileMessageList} = useContext(contextUser)
  return (
   <>
   
    <div className={mobileMessageList ? "message-container": "message-container-hide"}>
        <div className="message-header">
           <h3>Messages</h3>
        </div>
        <div className="message-container">
           <SingleMessage/> 
      </div>

   </div> 
   <ChatWindow/>
   </>
  )
}

export default Message
