const express = require('express')
const router = express.Router();
const multer = require('multer')
const Posts = require('../models/Postmodel');

//Routes for uploading post pictures in for specific users

const Storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, './postImages')
    },
    filename:(req, file, cb) =>{
        cb(null, Date.now()+ '__'+ file.originalname);
    }
});

const upload = multer({storage: Storage})

router.post('/createPost/:id', upload.array('postImage', 2), async(req, res) =>{


    try{
        const postText = req.body.postMessage

        const response = await Posts.create({
                            postId: req.params.id,
                            postCaption : postText,

                            postImage: {
                                data: req.files[0].filename,
                                contentType: "image/png"
                            }
                        })
        
            res.send({response, message: "file uploaded successfully"});


    }catch(error){
        res.status(500).send("Internal server error");
    }
})

//routes for getting data form the database in order to print user data in the specific post

router.get('/getpost/:id', async(req, res) =>{

    try{
        const userId = req.params.id;
        const response = await Posts.find({postId: userId}).sort({date: -1});
        
        res.contentType(response[0].postImage?.contentType);
        res.send(response);


    }catch(error){
        res.status(500).send("Internal server error");

    }
})

router.get('/allpost', async(req, res) =>{
    
    try{
        const posts = await Posts.find().sort({date: -1});
        res.send(posts);

    }catch(error){
        res.status(500).send("Internal server error");
    }
})

module.exports = router
