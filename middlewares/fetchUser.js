const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;
import { getCookie } from 'cookies-next';

const fetchUser = (handler)=> {
    let success;
    return async (req,res)=> {
        const token = getCookie("auth_token",{req, res}) || req.headers.auth_token;
        if(!token) {
            success = false;
            return res.json({success, error: "Invalid token!", status: 401});
        }
        try {
            const data = jwt.verify(token, secret);
            req.user = data.user;
            return handler(req,res);
        } catch (error) {
            success = false;
            return res.json({success, error: error.message, status: 401});
        }
    }
}

export default fetchUser;