import jwt from 'jsonwebtoken'

const generate_jwt = (obj,res)=>{
    const token =jwt.sign({...obj},process.env.KEY,{expiresIn:'6h'});
    console.log(token);
    res.cookie('token',
        token,
        {
            httpOnly:true,
            maxAge:6*60*60*1000,
            sameSite:"strict"
        }
    );           
}

export default generate_jwt;