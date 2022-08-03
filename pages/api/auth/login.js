import connectToMongo from "../../../db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const Joi = require('joi');
const { joiPasswordExtendCore } = require('joi-password');
const joiPassword = Joi.extend(joiPasswordExtendCore);
import { setCookie } from "cookies-next";

import User from "../../../models/User";

const schema = (input) => 
Joi.object({
    email: Joi.string().email().required().messages({
        'email.email': 'Enter a valid email!',
        'email.required': '{#email} cannot be empty!'
    }),
    password: joiPassword
                .string()
                .required()
                .messages({'password.required': '{#label} cannot be empty!',}),
}).validate(input, { abortEarly: false });

const secret = process.env.JWT_SECRET;

const handler = async (req, res)=> {
    connectToMongo();
    if(req.method === "POST") {
        let success = false;
        try {
            const {email, password} = req.body;
            const {error} = schema({ email, password });
            if(error) {
                success = false;
                return res.status(400).json({success, error: error.details[0].message});
            }

            const user = await User.findOne({email: email});
            if(!user) {
                success = false;
                return res.status(400).json({success, error: "No account is associated to this email!"});
            }

            const passwordCompare = await bcrypt.compare(password, user.password);
            if(!passwordCompare) {
                success = false;
                return res.status(400).json({success, error: "Incorrect Password!"});
            }

            const data = {
                user: {
                    id: user.id
                }
            };

            const authToken = jwt.sign(data, secret);
            setCookie("auth_token", authToken, {req, res, maxAge: 60 * 60 * 24});
            success = true;
            return res.status(200).json({success});
            
        } catch (error) {
            success = false;
            return res.status(500).json({success, error: error.message});
        }

    }
};

export default handler;