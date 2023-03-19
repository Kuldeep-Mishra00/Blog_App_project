import mongoose from "mongoose";

const userschema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'name is required']
    },
    email:{
        type:String,
        required:[true,'name is required'],
        unique: true
    },
    password:{
        type:String,
        required:[true,'name is required']
    }
},
{timestamps: true}
)

//export
const userModel = mongoose.model("users",userschema,"users");

export default userModel;