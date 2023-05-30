const{ default:mongoose }  = require("mongoose")

const postSchema = new mongoose.Schema({

    postId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        require: true
    },
    postCaption:{
        type: String

    },
    postImage:{
        data: Buffer,
        contentType: String
    },
    likeCount:{
        type: Number
    },
    commentCount:{
        type: Number
    },
    date:{
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model("post", postSchema);
