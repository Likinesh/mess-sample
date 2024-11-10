import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
import dotenv from 'dotenv'
import morgan from "morgan";
dotenv.config();
import Authrouter from "./routes/authRoutes.js";
import dataRouter from "./routes/dataRoutes.js";

const app=express();
app.use(express.json());
app.use(cors({
    origin:["http://localhost:5173"],
    credentials:true
}));
app.use(cookieParser());
app.use(morgan("dev"));

app.use('/api/auth',Authrouter);
app.use('/api/data',dataRouter);


app.listen(process.env.PORT,()=>{
    console.log("server started");
})