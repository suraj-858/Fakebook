const express = require('express')
const Users = require('../models/Usermodel')
const router = express.Router();
var fetchUser = require('../middleware/fetchuser')
const bcyrpt = require('bcryptjs')
const JWT_SECRET = "surajis@aboy"
const jwt = require('jsonwebtoken')
const {body, validationResult} = require('express-validator');
const multer = require('multer');


//method for calling single user form database
router.get('/getsingleuser/:id', async(req, res) =>{
    try{
        const userId = req.params.id;
        const user = await Users.findById(userId).select("-password");
        res.send(user);
    }catch(error){
        res.status(500).send("Internal server error");
    }
})

//method for calling all users from database and map 

router.get('/getalluser', fetchUser, async(req, res) => {
    
    try{
        
        const users = await Users.find({ _id: {$ne: req.params.id}}).select("-password")
        res.send(users);
    }catch(error){
        res.status(500).send("Internal server error");
    }
})

//methods for creating users into database

router.post('/createuser', async(req, res) =>{
    const {username, email, password, address} = req.body;

    try{
        let  user = await Users?.findOne({email});
        if(user){
            res.status(400).json({error:"user with this email already exists"})

        }

        let loginUser = await Users?.findOne({username});
        if(loginUser){
            res.status(400).json({error: "Username already taken"});
        }

        const salt = await bcyrpt.genSalt(10);
        const securePassword = await bcyrpt.hash(password, salt);

        user = await Users.create({
            username: username,
            email: email,
            password: securePassword,
            address: address
        })

        const data = {
            user: {
                user: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET )
        res.json({authtoken, user});
    }catch(error){
        res.status(500).send("Internal server error")
    }
});

//method for login into users

router.post('/login',[
    body('email', 'Enter your email').isEmail(),
    body('password', 'Enter your password').exists()
], async(req, res) =>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({error: errors.array()});
    }

    const {email, password} = req.body;
    let success = false;

    try{
        let user = await Users.findOne({email});
        if(!user){
            console.log(user);
            success = false;
            return res.status(400).json({success, error:"User with this email doesn't exists"})
        }

        const comparePassword = await bcyrpt.compare(password, user.password);
        if(!comparePassword){
            console.log(comparePassword)
            success = false;
            return res.status(400).json({success, error:"Invalid Password"})
        }
        const data = {
            user:{
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        if(success){
            res.json({success, user, authtoken});
        }
    }
    catch(error){
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }

});

router.post('/avatar/:id', fetchUser, async(req, res, next) =>{

    try{
        const userId = req.params.id
        const avatarImage = req.body.image;
        const userData  = await Users.findByIdAndUpdate(userId, {
            isAvatarImageSet: true,
            avatarImage
        },

        { new: true }
        
        );
        return res.json({
            isSet: userData.isAvatarImageSet, 
            image: userData.avatarImage,
        })
    }
    catch(ex){
    next(ex);
    }
})





//Routes for uploading cover photo in userProfile

const Storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, './images')
    },
    filename: (req, file, cb) =>{
        cb(null, Date.now() + '__' + file.originalname)
    }
});


    const upload = multer({storage: Storage}).single('image')


router.post('/single/:id', fetchUser, (req, res) =>{

    try{
        upload(req, res, async(err) =>{  
            if(err){
                console.log(err);
                
            }else{

                    const userId = req.params.id;

                     await Users.findByIdAndUpdate(userId, {
                        coverImage:{
                            data: req.file.filename, 
                            contentType: "image/png"
                        }
                    }, {new: true})
    
                    .then((response) =>{res.send({message:"image Uploaded successfully", 
                        response
                    })})
                    .catch((err) => console.log(err));
            }
        })

    }catch(error){
        res.status(500).send("Internal Server Error");
    }
    
})

//Route for getting users cover Image into database
 router.get('/userImage/:id', async (req, res) =>{
    
    try{
        const userId = req.params.id;
        const userImage  = await Users.findOne({_id: userId}).select("coverImage");
        console.log(userImage?.coverImage?.contentType);

            res.contentType(userImage?.coverImage?.contentType);
            res.send(userImage?.coverImage?.data);   

    }catch(error){
        res.status(500).send("Internal Server Error");
    }
 })

module.exports = router;
