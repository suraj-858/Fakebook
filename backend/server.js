const express = require('express')
const cors = require('cors');
const mongoose = require("mongoose");
const app = express();

const PORT = 5000;
const MONGO_URI = "mongodb+srv://suraj:john123@cluster0.5sdyknh.mongodb.net/Fakebook?retryWrites=true&w=majority";


app.use(
    cors({
        origin:"http://localhost:5173",
    })
) 

app.use(express.json());
app.use(express.urlencoded({extended: true}));

//available routes for users
app.use('/api/user', require('./Routes/Users'));
app.use('/api/login', require('./Routes/Users'));
app.use('/api/avatar/:id', require('./Routes/Users'));


//available routes for posts
app.use('/api/post', require('./Routes/Posts'));

// available routes for message
app.use('/api/message', require('./Routes/Messages'));


mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,  
    useUnifiedTopology: true,
})
.then(() =>{
    console.log("DB connection Successfull");

    
})
.catch((err) =>{  
    console.log(err.message);
})


const server = app.listen(PORT, () =>{
        console.log(`server started on port: ${PORT}`)
        })