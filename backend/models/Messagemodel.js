const {default:mongoose} = require('mongoose')

const messageSchema = new mongoose.Schema({

    message:{
        type: String,
        requried: true
    },
    
    users: Array, 

    sender:{
        type: mongoose.Schema.Types.ObjectId,  
        required: true, 
        ref: "user"
    }

}, {
    timestamps: true

})

module.exports = mongoose.model("message", messageSchema);