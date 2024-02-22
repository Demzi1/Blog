import express from 'express';
import cors from 'cors';
import postRoutes from './routes/posts.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import cookieParser from 'cookie-parser';
import multer from 'multer';
import dotenv from 'dotenv';
import {v2 as cloudinary} from 'cloudinary';

dotenv.config();
 
const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

const storage = multer.diskStorage({
        filename: function (req, file, cb) {
            cb(null, Date.now() + file.originalname)
          }
});
      
const upload = multer({ storage });

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY
});


app.post("/api/uploadcloudinary",upload.single("file"), async(req, res)=>{
  try {
    const file = req.file.path;
    const result = await cloudinary.uploader.upload(file);
    res.status(200).json(result)
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error uploading image' });
  }
})



app.use("/api/posts",postRoutes)
app.use("/api/auth",authRoutes)
app.use("/api/users",userRoutes)

app.get("/test",(req,res)=>{
   res.json("it works");
});

app.listen(8800, ()=>{
    console.log("Connected");
})