import React, { useState } from 'react'
import './style.scss'
import Logo from '../../assets/logo-fakebook.svg'
import { useContext } from 'react'
import { contextUser } from '../context/UserContext'
import axios from 'axios'
import {createMessage, allMessage} from '../../apiRoutes/ApiRoutes'
import { useEffect } from 'react'


const ChatWindow = ({chatUserId}) => {
    const{userInboxShow} = useContext(contextUser);
    const userId = localStorage.getItem("userId");
    const [userMessage , setUserMessage] = useState("");

    //function to create a message to a particular user
    const messageSent = async() =>{

        try{
            const response = await axios.post(createMessage , {
                to: chatUserId, 
                from: userId, 
                message: userMessage
            })

            console.log(response);
        }catch(error){
            console.log(error);
        }

        
    }

    //function to recieve the whole message for a particular user
    const [allMessages, setAllMessages] = useState([]);
    console.log(allMessages);

    useEffect(() =>{

        const messageRecieved = async() =>{

            try{
                console.log("this is to", chatUserId);
                console.log("this is not chat", userId);


                const response = await axios.get(allMessage, {
                    params:{
                        to: chatUserId, 
                        from: userId
                    }
                    
                })
    
                setAllMessages(response.data);
    
            }catch(error){
                console.error(error);
            }
        }
    
        messageRecieved();
        
    }, [chatUserId])
    



  return (
    <div className={userInboxShow ? "chat-inbox-container-show":"chat-inbox-container-hide"}>
        <div className="chat-section-window">


                <section className='chat-header-section'>
                    <div className="icon-name">
                        <img src={Logo} alt="" />
                        <h4>Suraj Gahatraj</h4>
                    </div>
                    <i className="fa-solid fa-circle-exclamation"></i>
                </section>
                <hr />

            <section className="chat-body-section">
                <div className="reciever-message">
                <div className="reciever-chat-box">
                <p className='user-message'>Hello raj</p>
                <p className="username">Suraj</p>
                </div>  
                </div>


                <div className="sender-message">
                <div className="sender-chat-box">
                <p className='user-message'>hellosuraj</p>
                <p className="username">Raj</p>
                </div>
                </div>
            </section>
                <hr />

               <section className="chat-footer-section">
                <input type="text" placeholder='Aa' onChange={(e) => setUserMessage(e.target.value) } />
                <i className="fa-solid fa-paper-plane" onClick={messageSent}></i>
                </section>

        </div>
    </div>
  )
}

export default ChatWindow
