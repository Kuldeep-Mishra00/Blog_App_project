import mongoose from "mongoose";

const postschema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,'title is required']
    },
    summary:{
        type:String,
        required:[true,'summary is required']
    },
    discription:{
        type:String,
        required:[true,'discription is required']
    },
    picture: {
        type: String,
        required: false
    },
    userid: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date
    }
},
{timestamps: true}
)

//export
const postModel = mongoose.model("posts",postschema,"posts");

export default postModel;