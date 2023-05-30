import React, { useContext } from 'react'
import SideNav from '../../components/sidenav/SideNav'
import Midpost from '../../components/MidPost/Midpost'
import Message from '../../components/Message/Message'
import './style.scss'
import Friend from '../../components/Friends/Friend'
import Profile from '../../components/profile/Profile'
import {  contextUser } from '../../components/context/UserContext'
import axios from 'axios'
import { useEffect } from 'react'
import { getSingleUser } from '../../apiRoutes/ApiRoutes'
import { useState } from 'react'


const Home = () => {
  const {profileShow} = useContext(contextUser);
  const [singleUserData, setSingleUserData] = useState()

  const usersId = localStorage.getItem("userId");

  useEffect(() =>{

    const singleUser = async() =>{

      const response = await axios?.get(`${getSingleUser}/${usersId}`);
        setSingleUserData(response?.data);
    }

    singleUser();
  }, [usersId])



  return (
    <div className='home-container'>
      <SideNav/>
      <Midpost />
      <Message/>
      <Friend/>
      {profileShow ? ( <Profile singleUserData = {singleUserData} />): ""}
     
    </div>
  )
}

export default Home
