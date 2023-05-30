import React from 'react'
import './style.scss'
import Logo from '../../assets/logo-fakebook.svg'
import { useContext } from 'react'
import { contextUser } from '../context/UserContext'

const SingleMessage = () => {
  const {userInbox} = useContext(contextUser);
  return (
    <div className='singlemessage-container'>

        <div className="user-container" onClick={userInbox}>
          <img src={Logo} alt="" />
          <div className="user-message">
            <h3>Suraj Gahatraj</h3>
            <p>k xa babu temro </p>
          </div>
          
           </div>
        <div className="user-container">
          <img src={Logo} alt="" />
          <div className="user-message">
            <h3>Suraj Gahatraj</h3>
            <p>k xa babu temro </p>
          </div>
          
           </div>
        <div className="user-container">
          <img src={Logo} alt="" />
          <div className="user-message">
            <h3>Suraj Gahatraj</h3>
            <p>k xa babu temro </p>
          </div>
          
           </div>
        <div className="user-container">
          <img src={Logo} alt="" />
          <div className="user-message">
            <h3>Suraj Gahatraj</h3>
            <p>k xa babu temro </p>
          </div>
          
           </div>
        <div className="user-container">
          <img src={Logo} alt="" />
          <div className="user-message">
            <h3>Suraj Gahatraj</h3>
            <p>k xa babu temro </p>
          </div>
          
           </div>
        <div className="user-container">
          <img src={Logo} alt="" />
          <div className="user-message">
            <h3>Suraj Gahatraj</h3>
            <p>k xa babu temro </p>
          </div>
          
           </div>
        <div className="user-container">
          <img src={Logo} alt="" />
          <div className="user-message">
            <h3>Suraj Gahatraj</h3>
            <p>k xa babu temro </p>
          </div>
          
           </div>
        <div className="user-container">
          <img src={Logo} alt="" />
          <div className="user-message">
            <h3>Suraj Gahatraj</h3>
            <p>k xa babu temro </p>
          </div>
          
           </div>
        <div className="user-container">
          <img src={Logo} alt="" />
          <div className="user-message">
            <h3>Suraj Gahatraj</h3>
            <p>k xa babu temro </p>
          </div>
          
           </div>
        <div className="user-container">
          <img src={Logo} alt="" />
          <div className="user-message">
            <h3>Suraj Gahatraj</h3>
            <p>k xa babu temro </p>
          </div>
          
           </div>
        <div className="user-container">
          <img src={Logo} alt="" />
          <div className="user-message">
            <h3>Suraj Gahatraj</h3>
            <p>k xa babu temro </p>
          </div>
          
           </div>
        <div className="user-container">
          <img src={Logo} alt="" />
          <div className="user-message">
            <h3>Suraj Gahatraj</h3>
            <p>k xa babu temro </p>
          </div>
          
           </div>
        <div className="user-container">
          <img src={Logo} alt="" />
          <div className="user-message">
            <h3>Suraj Gahatraj</h3>
            <p>k xa babu temro </p>
          </div>
          
           </div>
        <div className="user-container">
          <img src={Logo} alt="" />
          <div className="user-message">
            <h3>Suraj Gahatraj</h3>
            <p>k xa babu temro </p>
          </div>
          
           </div>
        <div className="user-container">
          <img src={Logo} alt="" />
          <div className="user-message">
            <h3>Suraj Gahatraj</h3>
            <p>k xa babu temro </p>
          </div>
          
           </div>
        <div className="user-container">
          <img src={Logo} alt="" />
          <div className="user-message">
            <h3>Suraj Gahatraj</h3>
            <p>k xa babu temro </p>
          </div>
          
           </div>
        <div className="user-container">
          <img src={Logo} alt="" />
          <div className="user-message">
            <h3>Suraj Gahatraj</h3>
            <p>k xa babu temro </p>
          </div>
          
           </div>
        <div className="user-container">
          <img src={Logo} alt="" />
          <div className="user-message">
            <h3>Suraj Gahatraj</h3>
            <p>k xa babu temro </p>
          </div>
          
           </div>
    </div>
  )
}

export default SingleMessage
