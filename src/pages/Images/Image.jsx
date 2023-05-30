import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { coverImage } from '../../apiRoutes/ApiRoutes'

const Image = () => {

    const [postImage, setPostImage] = useState("")

console.log(postImage); 


  const handleFile = async(e) =>{
    e.preventDefault();

    const data = new FormData();
    data.append('image', postImage);

    const userId = localStorage.getItem("userId");
    const config = {
            headers:{
             "auth-token": localStorage.getItem("user-token"),
         }
     }

    try{
      await axios.post(`${coverImage}/${userId}`, data, config )
      .then(function(response){
        console.log(response);
        console.log("file uploaded successfully");

      }).catch((err) =>{
        console.log(err);
      })


    }catch(error){
      console.log(error);
    }

  }


  return (
    <div>
        <form onSubmit={handleFile} >
            <input type="file" name="image" onChange={(e) =>setPostImage(e.target.files[0])} />
            <button type='submit'>Submit</button>
        </form>
      
    </div>
  )
}

export default Image;
