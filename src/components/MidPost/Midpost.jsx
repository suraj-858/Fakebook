import React, { useEffect } from 'react'
import './style.scss'
import { useState } from 'react'
import axios from 'axios';
import { createPost, getAllPost } from '../../apiRoutes/ApiRoutes';
import Post from '../post/Post'

function Midpost() {
  const [postPic, setPostPic] = useState()
  const [postText, setPostText] = useState("");




  const submitPost = async(e) =>{
    e.preventDefault();

    const data = new FormData();

    data.append('postImage', postPic);
    data.append('postMessage', postText);

    const userId = localStorage.getItem("userId");

    try{

      await axios.post(`${createPost}/${userId}`,  data)
      .then(function(response){
        console.log(response);
        console.log("post created successfully");
      })
      .catch((error) =>console.log(error));

      setPostPic("");
      setPostText("")

    }catch(error){
      console.log(error);
    }
    
  }
  const [everyPost, setEveryPost] = useState([])

  useEffect(()=>{
      const allPost = async() =>{

        await axios.get(getAllPost)
        .then((response) =>{
          setEveryPost(response?.data);

        }).catch((error) =>{
          console.log(error);
        })
      }
      allPost();
  }, [])

  

  return (
    <div className='mid-container'>

      <section className='mobile-view-container'>

          <div className="upload-section">

            <form onSubmit= {submitPost} encType="multipart/form-data" method="post">
                <h3>Create Post</h3>

                <div className="input-text-container">
                <input className='input1' type="text" placeholder='Say something' onChange={(e) => setPostText(e.target.value)}  />
                </div>

                <div className="file-upload">
                  <label htmlFor="upload-image"><i id={postPic ? 'upload-icon' : ''} className="fa-solid fa-upload"></i> </label>
                <input id='upload-image' className='input2' type="file" name='postImage' onChange={(e)=>setPostPic(e.target.files[0])} />
                <button type='submit'>Post</button>

                </div>
                
            </form>

            <hr />

          </div>

          <div className="post-array-section">
            <h3>News Feeds</h3>

             {everyPost?.map(( postedData) =>{

              return(
              < Post key={postedData._id} postedData = {postedData}/>
              )

             })}

          </div>

      </section>

    </div>
  )
}

export default Midpost
