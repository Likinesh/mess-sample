import jwt from 'jsonwebtoken';

export const verifyuser = async (req,res,next)=>{
    try {
        const token = req.cookies.token;
        if(!token){
            return res.json({status:false, message:'no token'});
        }
        const decoded = await jwt.verify(token,process.env.KEY);
        
        next();
    } catch (error) {
        console.log("error in route authorization middleware: ", error.message)
        res.status(500).json({status:false, error: "internal server error" });        
    }
}