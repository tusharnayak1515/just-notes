import connectToMongo from "../../../db";
import { setCookie } from "cookies-next";
import fetchUser from "../../../middlewares/fetchUser";

import User from "../../../models/User";
import Note from "../../../models/Note";

const handler = async (req, res)=> {
    connectToMongo();
    if(req.method === "GET") {
        let success = false;
        try {
            const userId = req.user.id;
            const user = await User.findById(userId)
                .select("-password");
            
            if(!user) {
                success = false;
                return res.status(404).json({success, error: "User doesnot exist"});
            }

            setCookie("jn_profile", JSON.stringify(user), {req, res});
            success = true;
            return res.status(200).json({success, user});
            
        } catch (error) {
            success = false;
            return res.status(500).json({success, error: error.message});
        }

    }
};

export default fetchUser(handler);