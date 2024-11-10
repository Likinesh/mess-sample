import express, { Router } from 'express'
import bcrypt from 'bcrypt';
import generate_jwt from '../utils/jwt_token.js';
import dotenv from 'dotenv'
dotenv.config();

import {LoginUser,LogoutUser, resetpassword, resetPasswordMail, SignupUser} from '../controllers/authController.js';
import { verifyuser } from '../middleware/route_auth.js';

const router = express.Router();

router.post('/signup',SignupUser); // Still incomplete
router.post('/forgotpassword',resetPasswordMail)
router.post('/login',LoginUser)
router.get('/logout',LogoutUser)
router.post('/resetpassword/:token',resetpassword);
router.get('/verify',verifyuser,(req,res)=>{
    return res.json({status:true,message:'Authorized'});
})

export default router;