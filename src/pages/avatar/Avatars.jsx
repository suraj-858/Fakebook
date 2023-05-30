import React, { useEffect, useState } from 'react'
import './style.scss'
import { useNavigate } from 'react-router-dom';
import { Buffer } from 'buffer';
import axios from 'axios';
import Loader from '../../components/Loader';
import { avatarRoute } from '../../apiRoutes/ApiRoutes';


const Avatars = () => {
    const navigate = useNavigate();
    const [avatars, setAvatars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const[selectedAvatar, setSelectedAvatar] = useState(undefined);
    const api = 'https://api.multiavatar.com/4342314'

    useEffect(() =>{
        const fetchData = async() =>{
            const data = [];
            for (let i = 0; i < 2; i++) {
           const image = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`)
           const buffer = new Buffer(image.data);
           data.push(buffer.toString("base64"));
            }
            setAvatars(data);
            setIsLoading(false);
        }
        fetchData();

    }, [])

    const setAvatar = async() =>{


        if(selectedAvatar === undefined){
            console.log("Please select an avatar");
        }else{
            const user = JSON.parse(localStorage?.getItem('user-details'));
 
            console.log(user);

            const config = {
                headers:{
                    "auth-token": localStorage.getItem("token"),
                }
            }

            const {data} = await axios.post(`${avatarRoute}/${user._id}`, {

                image: avatars[selectedAvatar],
                
            }, config)
            if(data.isSet){
                user.isAvatarImageSet  = true;
                user.avatarImage = data.image;
                localStorage.setItem('user-details', user);
                navigate('/')
            }else{
                console.log("error setting avatar please try again")
            }
        }
    }


  return (
    <div className='container-avatar'>
      <div className="avatar-container">
        <div className="title">
            <h1>Pick an avatar as your profile Picture</h1>
        </div>

        <div className="avatars">
            {
                !isLoading ? 
                (<>
                {
                    avatars.map((avatar, index) => {
                        return(
                            <div key={index} className={`avatar ${selectedAvatar === index ? "selected":""}`}>
                                <img src={`data:image/svg+xml;base64,${avatar}`} alt="avatar" 
                                onClick={() =>setSelectedAvatar(index)}/>
                            </div>
                        )
                    })
                }
                
                </>)
                :
                (<><Loader/></>)
                

            }
        </div>

        <button onClick={setAvatar} className='btn-sumbit'>Select an avatar for Profile Picture</button>   

      </div>
    </div>
  )
}

export default Avatars
