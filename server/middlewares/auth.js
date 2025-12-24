import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
    const {token} = req.headers;
    if (!token) {
        return res.status(401).json({success: false, message: "Unauthorized access"});
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        // console.log(decoded);
        
        if(decoded.id){
            req.userId = decoded.id;
            // console.log(req.body.prompt);
        } else {
            return res.status(401).json({success: false, message: "Unauthorized access"});
        }
        next();
         
    } catch (error) {
        return res.status(401).json({success: false, message: error.message + 'hello'});
    }
}

export default userAuth;