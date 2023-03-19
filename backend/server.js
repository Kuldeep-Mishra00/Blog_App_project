import Express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import dbconnetion from "./config/dbconnetion.js";
import{ AuthenticationController, CreateController, LoginController, SingupController,Getposts, Getpost, Getname, Deletepost, Updatepost } from "./resp/Apis_Controller.js";
import Authentication from "./middlewares/authcheck.js";
import upload from './utils/upload.js';
import { uploadImage, getImage } from './resp/image-controller.js';
// config env 
dotenv.config();

//database_connectio
const pass = process.env.PASSWORD;
dbconnetion(pass);

const app = Express();
// middlewares

app.use(morgan('dev'));
app.use(Express.json());
app.use(cors());

// Routes
app.get('/', (req, resp) => {
    resp.send('route is working');
})


app.post('/login', LoginController)
app.post('/singup', SingupController)
app.post('/Auth', Authentication, AuthenticationController)

app.post('/file/upload', upload.single('file'), uploadImage);
app.get('/file/:filename', getImage);

app.post('/createpost', Authentication, CreateController)
app.get('/posts', Getposts)
app.get('/post/:id', Getpost)
app.put('/update/:id', Authentication, Updatepost)
app.get('/user/:id', Authentication, Getname)
app.delete('/delete/:id', Authentication, Deletepost)
//Port
const PORT = 5000 || process.env.PORT;

app.listen(PORT, () => {
    console.log(`srever is running on port: ${PORT}`);
}) 