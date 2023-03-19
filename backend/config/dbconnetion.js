import mongoose from "mongoose";
const dbconnetion  = async(pass) => {
  try{
     await mongoose.connect(`mongodb+srv://kuldeepm:${pass}@cluster0.zxsgnm9.mongodb.net/blog-app?retryWrites=true&w=majority`)
     console.log(' database connected');
    }catch(error){
        console.log('facing error to connect database');
    }
}

export default dbconnetion 