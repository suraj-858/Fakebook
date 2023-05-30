import React from 'react'
import './style.scss'
import Logo from '../../assets/logo-fakebook.svg'
import { useContext } from 'react'
import { contextUser } from '../context/UserContext'

const ChatWindow = () => {
    const{userInboxShow} = useContext(contextUser);
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
                <input type="text" placeholder='Aa'/>
                <i className="fa-solid fa-paper-plane"></i>
                </section>

        </div>
    </div>
  )
}

export default ChatWindow
