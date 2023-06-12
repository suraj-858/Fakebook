const express = require('express')
const router = express.Router();
const Messages = require('../models/Messagemodel');





router.post('/createMessage', async(req, res) =>{

    try{
        const {message, from, to} = req.body

        var newMessage = {
            message: message, 
            users: [from, to],
            sender: from

        }
        const messageData = await Messages.create(newMessage);
        if(messageData){
           return res.json({msg:"message sent successfully"});

        }else{

            return res.json({msg:"failed to send message "});
        }
    }
    catch(error){
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
})




//get all userData with user's last message
router.get('/getLastMessage', async(req, res) =>{

    try{
        const {message, to, from} = req.body;
        

    }catch(error){
        res.status(500).send("Internal server error");
    }
})




//route for recieving the whole message for users
router.get('/getAllMessage', async(req, res) =>{
    try{

        const {from, to} = req.body;
        console.log(from);
        console.log(to);
        
        const messages = await Messages.find({users:{$all:[from, to]} }).sort({updatedAt: 1});

        const projectedMessages = messages.map((msg) =>{
            return{
                fromself: msg.sender.toString() === from, 
                message: msg.message
            }
        })
        res.send(projectedMessages);
    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})

module.exports = router;