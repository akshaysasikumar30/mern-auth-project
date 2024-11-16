import jwt from "jsonwebtoken"

export const verifyToken = (req,res,next) =>{
    const token = req.cookies.token
    if(!token) return res.status(401).json({success:false,message:"unauthorized - no token provided"})
    try {
        const decoded = jwt.verify(token,process.env.JWT_secret)

        if(!decoded) return res.status(401).json({success:false,message:"Unauthorized - invalid token"})

        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.log("Error in verifyToken",error)
        return res.status(500).json({success:false,message:"server error"});
        
    }
}