import connectToMongo from "../../../db";
import fetchUser from "../../../middlewares/fetchUser";
import { setCookie } from "cookies-next";
const Joi = require('joi');

import User from "../../../models/User";
import Note from "../../../models/Note";

const schema = (input) => 
Joi.object({
    name: Joi.string().min(4).max(25).required().messages({
        'name.min': '{#label} should contain at least {#min} characters!',
        'name.max': '{#label} should contain at most {#max} characters!',
        'name.required': '{#label} cannot be empty!',
    }),
    email: Joi.string().email().required().messages({
        'email.email': 'Enter a valid email!',
        'email.required': '{#email} cannot be empty!'
    }),
}).validate(input, { abortEarly: false });

const handler = async (req, res)=> {
    connectToMongo();
    if(req.method === "PUT") {
        let success = false;
        try {
            const userId = req.user.id;
            const {name, email} = req.body;
            const {error} = schema({ name, email });
            if(error) {
                success = false;
                return res.status(400).json({success, error: error.details[0].message});
            }

            let user = await User.findById(userId);
            if(!user) {
                success = false;
                return res.status(404).json({success, error: "User doesnot exist!"});
            }
            
            user = await User.findOne({email: email});
            if(user) {
                if(user._id.toString() !== userId) {
                    success = false;
                    return res.status(400).json({success, error: "This email is already associated to another account!"});
                }
            }

            user = await User.findByIdAndUpdate(userId, {name: name, email: email}, {new: true})
                .select("-password")
                .select("-folders");

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