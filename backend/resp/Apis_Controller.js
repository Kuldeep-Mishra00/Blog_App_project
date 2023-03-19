
import userModel from "../models/Usermodel.js";
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";
import postModel from "../models/Postmodel.js";

const LoginController = async (req, resp) => {

    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
        return resp.send({ msg: "USER NOT FOUND", success: false })
    }
    let match = await bcrypt.compare(req.body.password, user.password);
    if (!match) {
        return resp.send({ msg: "INVALID PASSWORD", success: false });
    }
    const token = Jwt.sign({ id: user._id }, process.env.JWT_SCRT, { expiresIn: '1d' })
    resp.send({ msg: "LOGIN SUCCESSFULLY", success: true, token });
}


const SingupController = async (req, resp) => {
    try {
        let emialverification = await userModel.findOne({ email: req.body.email });
        if (emialverification) {
            return resp.send({ msg: "Email exists", success: false })
        }
        //hashing__Password
        const pass = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(pass, salt);
        req.body.password = hashpassword;

        let user = new userModel(req.body);
        let result = await user.save();
        resp.send({ msg: "register successfully", success: true });
    } catch (error) {
        resp.status(500).send({ msg: `Resigter error`, success: false })
    }

}

const AuthenticationController = async (req, resp) => {
    try {
        const user = await userModel.findOne({ _id: req.body.id });
        if (!user) {
            return resp.send({ msg: "USER NOT FOUND", success: false })
        } else {
            resp.send({
                success: true,
                id: user._id,
            });
        }
    } catch (error) {
        resp.status(500).send({ msg: `Auth error`, success: false })
    }
}

const CreateController = async (req, res) => {
    const post = await new postModel({
        title: req.body.title,
        summary: req.body.summary,
        discription: req.body.discription,
        picture: req.body.picture,
        userid: req.body.userid,
        createdDate: req.body.createdDate
    })
    const savepost = await post.save();
    if (savepost) {
        res.send({ msg: "post save successfully", success: true })
    } else {
        res.send({ msg: "post save successfully", success: false })
    }
}

const Getposts = async(req,resp)=>{
    const posts = await postModel.find({});
    resp.send(posts);
}

const Getpost = async(req,resp)=>{
    const posts = await postModel.findById(req.params.id);
    resp.send(posts);
}

const Getname = async(req,resp)=>{
    const posts = await userModel.findById(req.params.id);
    resp.send(posts);
}

const Deletepost =async(req,resp)=>{
    try {
        const posts = await postModel.findByIdAndDelete(req.params.id);
        if(posts){
            resp.send({success: true,msg:'Post Deleted'})
        }else{
            resp.send({success: false,msg:'Post API  has error'})
        }
    } catch (error) {
        resp.send({success: false,msg:'Not deleted'})
    }
}

const Updatepost =async(req,resp)=>{
    try {
        const posts = await postModel.findById(req.params.id);

        if(!posts){
            resp.send({success: false,msg:'user not find'})
        }
        await postModel.findByIdAndUpdate(req.params.id,
            {
                $set: req.body
            }
        );

        if(posts){
            resp.send({success: true,msg:'update successfully'})
        }else{
            resp.send({success: false,msg:'Post API  has error'})
        }
    } catch (error) {
        resp.send({success: false,msg:'Not deleted'})
    }
}

export { LoginController, SingupController, AuthenticationController , CreateController, Getposts, Getpost,Getname,Deletepost,Updatepost}