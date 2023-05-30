const express = require('express')
const cors = require('cors');
const mongoose = require("mongoose");
const app = express();

const PORT = 5000;
const MONGO_URI = "mongodb://localhost:27017/Fakebook";


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