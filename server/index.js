import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

import authRoutes from './routes/auth.js'
import menuRoutes from './routes/menu.js'
import qrCodeRoutes from './routes/qrcode.js'


dotenv.config();

const app=express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res)=>res.send("hello from server"));

app.use('/api/auth', authRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/qrcode', qrCodeRoutes);


mongoose.connect(process.env.MONGO_URI).then(()=>console.log("db connected"));


const PORT=process.env.PORT || 5000;
app.listen(PORT, ()=>console.log(`server is running on port ${PORT}`));