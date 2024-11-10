import pool from "../DB/dbConfig.js";
import bcrypt from "bcrypt"
import generate_jwt from "../utils/jwt_token.js";
import nodemailer from 'nodemailer'
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

export const SignupUser = async (req,res)=>{
    const {username,email,password}=req.body;
    try{
        let user = await pool.query(`select * from student_details where reg_no = $1` ,[username])
        console.log(user);
        if(user){
            return res.status(400).json({
                success: false,
                message: "You are registered!",
            });
        }
        const hashpassword = await bcrypt.hash(password,process.env.SALT_ROUNDS);
        
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}

export const LoginUser =async(req,res)=>{
    const {username,password}=req.body;
    try{
        let user = await pool.query(`select * from student_details where reg_no = $1` ,[username])
        console.log(user);
        if(!user){
            return res.status(400).json({
                success: false,
                message: "You are not registered!",
            });
        }
        user=user.rows[0];
        console.log(user);
        let hostel = await pool.query(`select hostel_name , room_number from hostel_details where reg_no = $1`,[user.reg_no]);
        if(!hostel){
            return res.status(400).json({
                success: false,
                message: "Not alloted any hostel,Contact the Caretaker",
            });
        }
        hostel=hostel.rows[0];
        console.log(hostel);
        const dbpassword=user.password;
        const ismatch = await bcrypt.compare(password,dbpassword);
        if(ismatch){
            let obj={username:user.username,reg_no:user.reg_no,clg_mail:user.clg_mail,ph_number:user.ph_number,gender:user.gender,hostel:hostel.hostel_name,room_no:hostel.room_no};
            generate_jwt(obj,res);
            res.status(201).json({
                status: true,
                message: "Login Successful",
                data:obj
            });
        }
        else{
            res.status(400).json({
                success: false,
                message: "Wrong Password",
            });
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

export const LogoutUser = (req, res)=>{

    try {
        console.log("logout")
        res.cookie("jwt" ,"" ,{maxAge:0});
        res.clearCookie('token');
        res.status(201).json({status:true,message:"loggedout successfully"});
        
    } catch (error) {
        console.log("error in logout controller ,", error.message);
        res.status(500).json({status:false,error:"internal  server error"})
        
    }
}

export const resetPasswordMail = async(req,res)=>{

    const transporter = nodemailer.createTransport({
        service: 'gmail', 
        auth: {
            user: process.env.EMAIL_ID,
            pass: process.env.EMAIL_PASSWORD
        }
    })    
    console.log(process.env.EMAIL_PASSWORD)

    try {
        let user = await pool.query('select clg_mail from student_details where reg_no = $1' , [req.body.username]);
        if(!user){
            console.log("user not found in resetpassword controller");
            res.status(404).json({status:false,error:"incorrect reg_no"});
        }
        user= user.rows[0]
        const token = crypto.randomBytes(20).toString('hex');
        const tokenExpiration = Date.now() + 3600000;
        let user2 = await pool.query(`SELECT * FROM reset_tokens WHERE reg_no=$1`,[req.body.username]);
        console.log(user2);
        let q1;
        if(user2){
        q1=await pool.query(`
            INSERT INTO reset_tokens (reg_no, token, expires_at , created_at)
            VALUES ($1, $2, $3 , $4)
        `, [req.body.username, token, tokenExpiration , Date.now()]);
        }
        else{
            q1=await pool.query(`UPDATE reset_tokens SET token = $2, expires_at = $3 , created_at =  $4 WHERE reg_no=$1;`,
                [req.body.username, token, tokenExpiration , Date.now()]
            );
        }
        console.log(q1);
        const resetUrl = process.env.FRONTEND_URL+`/resetpassword/${token}`
        console.log(user);
        const mailOptions = {
            to: user.clg_mail,
            from: process.env.EMAIL_ID,
            subject: 'Password Reset',
            text:`Please click on the following link, or paste it into your browser to complete the process:\n\n` +
                `${resetUrl}\n\n`
        };

        transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error occurred');
            console.log(error.message);
            return process.exit(1);
        }
        console.log('Message sent successfully!');
        // console.log(info);
    });
    res.status(201).json({status:true,message:"reset link sent successfully"})
    } catch (error) {
        console.log("error in resetpassword controller ,", error.message);
            res.status(500).json({error:"internal  server error"})       
    }
}

export const resetpassword = async (req,res)=>{
    const token = req.params.token;
    const {password}=req.body;
    try {
        // const decoded =await jwt.verify(token,process.env.KEY);
        // const id = decoded.id;

        let result = await pool.query('SELECT * FROM reset_tokens WHERE token = $1 AND expires_at > $2', [token, Date.now()]);
        console.log(result.rows)
        if (result.rows.length === 0) {
            return res.status(400).json({ error: 'Invalid or expired token' });
        }
        
        result = result.rows[0];
        let userCheck = await pool.query('SELECT * FROM student_details WHERE reg_no = $1', [result.reg_no]);
        if (userCheck.rowCount === 0) {
            console.log("User not found with reg_no:", result.reg_no);
            return res.status(400).json({ error: "User not found" });
        }
        const hashpassword=await bcrypt.hash(password,10);
        console.log(hashpassword)
        let res1 = await pool.query(`UPDATE student_details SET password = $1 WHERE reg_no = $2;` , [hashpassword , result.reg_no])
        if(res1.rowCount===0){
            console.log("cant update password ", res1);
            res.status(400).json({error:"error in updating password"})
            throw new Error("error in updating password 'in query' ");         
        }
        
        res.status(201).json({status:true,message:"successfully updated password"})
    } catch (error) {
        console.log("Error changing password "+error.data);
        res.status(500).json({error:"internal  server error"});
    }
}