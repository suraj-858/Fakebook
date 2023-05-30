import React, { useState } from 'react'
import './style.scss'
import John from '../../assets/john-cena.jpg'
import DialogTitle  from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'
import { useEffect } from 'react'
import axios from 'axios'
import { getSingleUser } from '../../apiRoutes/ApiRoutes'

const Post = ({allUserInfo, singleUserData, post, chatProfileShow, postedData}) => {

    const userForPost  = postedData?.postId;

    let filename;
    if(!post){
        filename = postedData?.postImage?.data
    }
    else{
        filename = post?.postImage?.data
    }

     const [specificUserData, setSpecificData] = useState();

    

    useEffect(()=>{
        
        const postUsers = async() =>{
            if(postedData){
            await axios.get(`${getSingleUser}/${userForPost}`)
            .then((response) =>{
                setSpecificData(response?.data);
            })
        }
     }
        postUsers();
    }, [userForPost])



    


    const bufferData = new Uint8Array(filename?.data);
    const stringData = String.fromCharCode(...bufferData);

    const [openDialog, handleDisplay] = useState(false);
    const [showComment, setShowComment] = useState( {position:false, color: ""});
    const [postColor, setPostColor] = useState("")

    const handleClose = () =>{
        handleDisplay(false);
    }

    const openDialogBox = () =>{
        handleDisplay(true);
    }

    //css for the dialog box

    const dialogStyle = {
        padding: "10px",
        margin: "auto",
        minWidth: "300px",
        fontWeight: "600"
    }

    const styleForInput = {
        margin: "10px",
        height: "40px", 
        width: "90%",
        display: "flex",
        flexWrap: "wrap",
        resize: "none",
        alignSelf: "center",
        writtingMode:"vertical-rl",
        textOrientation: "mixed",
        whiteSpace: "nowrap",
        overflow: "hidden"
        
        
    }

  return (
    <div className='post-container'>
        <section className="post-header">
            <div className="main-header-section">

                <div className="user-profile-section">
                    <img src={`data:image/svg+xml;base64,${chatProfileShow ? allUserInfo?.avatarImage : singleUserData?.avatarImage || specificUserData?.avatarImage}`} alt="" />

                    <h4>{allUserInfo ? allUserInfo?.username: singleUserData ?.username || specificUserData?.username}</h4>
                </div>

                <div className="post-edit-section">
                <i onClick={openDialogBox} className="fa-solid fa-pen-to-square"></i>
                </div>

            </div>
        <div className="text-header-section">
            <p>{post ? post?.postCaption : postedData?.postCaption || postedData?.postCaption}</p>
        </div>
        </section>
        <Dialog style={dialogStyle} onClose = {handleClose} open = {openDialog}>
            <DialogTitle style={dialogStyle}>Edit Post</DialogTitle>
            <h3 >
               
            </h3>
            <input style={styleForInput} type="text"  />
        </Dialog>

        <section className="post-body">
            <img className= {!stringData ? 'no-image':''}  src={`http://localhost:5173/postImages/${stringData}`} alt="" />
        </section>
        <section className="post-footer">
            <div className="like-comment">
                <div className="like-comment-display">
                <span><p>10 likes</p></span>
                <span><p>2 comment</p></span>
                </div>
                <hr />
                <div className="like-comment-react">
                    <span><i style={{color: postColor}} className="fa-regular fa-heart" onClick={() =>{!postColor  ? setPostColor("red"): setPostColor("")}}></i></span>
                    <hr />
                    <span><i style={{color: showComment.color}}  className="fa-regular fa-comment" onClick={() =>{!showComment.position ? setShowComment( {position:true, color:"red"}) : setShowComment( {position: false, color: ""})}}></i></span>
                    

                </div>

            </div>
            <hr />
            <div className={showComment.position ? "comment-section" : "comment-section-hide"}>
                <div className="user-profile-comment">

                    <div className="user-comment">
                        <img src={John} alt="" />
                        <h4>Suraj Gahatraj</h4>
                    </div>

                <p> hello suraj nice u r</p>

                </div>


                <div className="comment-container">
                    <input type='text' placeholder='write a comment'/>
                    <span><i className="fa-solid fa-paper-plane"></i></span>
                </div>
            </div>
        </section>
      
    </div>
  )
}

export default Post
