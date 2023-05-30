import React from 'react'
import './style.scss'
import Logo from '../../assets/logo-fakebook.svg'
import { useContext } from 'react'
import { contextUser } from '../context/UserContext'

const SideNav = () => {

  const{mobileFriendShow, mobileMessageShow, profilePictureShow} = useContext(contextUser);
  return (
    <div className='container-nav'>
      <div className="logo-section">
      <img src={Logo} alt="" />
      </div>
      <ul className='nav-element'>

          <li onClick={mobileFriendShow} className= {`friend-element`}>
          <i  className="fa-solid fa-user-group"></i>
          </li>
          

         <li onClick={mobileMessageShow} className= 'message-element'>
          <i  className={`fa-brands fa-facebook-messenger`}></i>
          </li>
 
          <li onClick={profilePictureShow}  className='profile-element'>
          <img src={Logo} alt="" />
          </li>
         

          
      </ul>
    </div>
  )
}

export default SideNav;
