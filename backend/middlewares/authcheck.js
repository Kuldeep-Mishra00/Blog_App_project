import Jwt from "jsonwebtoken";

const Authentication = async(req,resp,next)=>{
    const token = req.headers['authorization'].split(' ')[1];
    Jwt.verify(token,process.env.JWT_SCRT,(err, decode)=>{
        if(err){
            return resp.send({
                msg:"AUTH Fialed",
                success:false
            })
        }else{
            req.body.id= decode.id
            next()
        }
    })
}
export default Authentication