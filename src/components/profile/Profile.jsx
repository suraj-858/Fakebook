import React, {useContext, useState} from 'react'
import './style.scss'
import { contextUser } from '../context/UserContext'
import axios from 'axios'
import { coverImage, getPost, userImage } from '../../apiRoutes/ApiRoutes'
import { useEffect } from 'react'
import Post from '../post/Post'
import ChatWindow from '../chatWindow/ChatWindow'


const Profile = ({allUserInfo, singleUserData}) => {

   
    const{profileShow, chatProfileShow, userInbox } = useContext(contextUser);
    
    const [postImage, setPostImage] = useState("");


      const handleFile = async(e) =>{
        e.preventDefault();
    
        const data = new FormData();
        data.append('image', postImage);
    
        const config = {
                headers:{
                 "auth-token": localStorage.getItem("user-token"),
             }
         }
    
        try{
          await axios.post(`${coverImage}/${singleUserData ? singleUserData?._id : allUserInfo?._id}`, data, config )
          .then(function(response){
            console.log(response?.data?.response?.coverImage?.data);
            console.log("file uploaded successfully");
    
          }).catch((err) =>{
            console.log(err);
          })
    
    
        }catch(error){
          console.log(error);
        }
    
      }
    const [userCover, setUserCover] = useState();

      useEffect(() =>{
        const fetchImage = async() =>{

          await axios?.get(`${userImage}/${singleUserData ? singleUserData?._id : allUserInfo?._id}`)
          .then(function(response){
            setUserCover(response);

          }).catch((err) =>{
            console?.log(err);
          })
        }
        fetchImage();
      }, [singleUserData, allUserInfo])

      const imagePath = `http://localhost:5173/images/${userCover?.data}`
      const noImage = "https://t3.ftcdn.net/jpg/04/56/12/40/360_F_456124067_5CGjvDRMWo6XJp40buFwh9mia6EN7Sx2.jpg"

        const backgroundImageUrl  = `url(${userCover?.data ? imagePath: noImage})`


        //data fetching from post api to display the post of specific users
      const [userPostData, setUserPostData] = useState([]);
      const dataSet = userPostData[0]?.response?.data;

        useEffect(() =>{
          
          const postFetchData = async() =>{

              await axios.get(`${getPost}/${singleUserData ? singleUserData._id : allUserInfo._id}`)
              .then(function(response){
                setUserPostData([{response}])

              })
          }
          postFetchData();
        }, [singleUserData, allUserInfo])
        



  return (
    <div className={profileShow || chatProfileShow ? "profile-container": "profile-container-hide"}>
        <div className="profile-main-container">
          <div className="cover-image">
                <div className="cover-profile" style={{backgroundImage: backgroundImageUrl}}>

                <form  onSubmit={handleFile} className={singleUserData ? "form-show": "form-hide"} >
                <label htmlFor="input-Image"><i className="fa-solid fa-upload"></i></label>
                <input type="file" id='input-Image' name="image" onChange={(e) =>setPostImage(e.target.files[0])} />
                <button type='submit'>Submit</button>
                </form>

                </div>
                <img src={`data:image/svg+xml;base64,${chatProfileShow ? allUserInfo?.avatarImage : singleUserData?.avatarImage}`} alt="" />
          </div>

          <div className="name-and-followers">
          <h3>{chatProfileShow ? allUserInfo?.username: singleUserData?.username}</h3>
          <p>1.2k friends</p>
          <button onClick={userInbox}>Message</button>
          </div>

          <div className="photo-section">
            <h4>Photos</h4>
            <hr />
          </div>

          <div className="post-section">
            <h4>Your Posts</h4>
              {
                dataSet?.map((post, index) =>{

                  return(
                    <Post key={index} allUserInfo = {allUserInfo} singleUserData = {singleUserData} post = {post} chatProfileShow = {chatProfileShow}/>
                  )

                })
              }
          </div>

        </div>
    </div>
  )
}

export default Profile
