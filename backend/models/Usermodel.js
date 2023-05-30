const { default: mongoose } = require("mongoose");


const userSchema = new mongoose.Schema({
    
    username:{
        type: String, 
        required: true, 
        min: 3,
        max: 20,
    },

    address:{
        type: String, 
        required: true,
        min: 3,
        max: 20,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        max: 50,
        
    },
    password: {
        type: String,
        required: true,
        min: 8,
    },
    isAvatarImageSet:{
        type: Boolean,
        default: false,

    },
    
    avatarImage: {
        type: String,
        default: "",
    },

    coverImage:{
        data: Buffer,
        contentType: String
    }, 
    date:{
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model("user", userSchema)
