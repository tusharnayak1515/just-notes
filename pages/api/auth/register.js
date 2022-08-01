import connectToMongo from "../../../db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const Joi = require('joi');
const { joiPasswordExtendCore } = require('joi-password');
const joiPassword = Joi.extend(joiPasswordExtendCore);
import { setCookies } from "cookies-next";

import User from "../../../models/User";

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
    password: joiPassword
                .string()
                .min(8)
                .minOfSpecialCharacters(1)
                .minOfLowercase(1)
                .minOfUppercase(1)
                .minOfNumeric(1)
                .noWhiteSpaces()
                .required()
                .messages({
                    'password.min': '{#label} should contain at least {#min} characters!',
                    'password.minOfUppercase': '{#label} should contain at least {#min} uppercase character!',
                    'password.minOfSpecialCharacters':
                          '{#label} should contain at least {#min} special character!',
                    'password.minOfLowercase': '{#label} should contain at least {#min} lowercase character!',
                    'password.minOfNumeric': '{#label} should contain at least {#min} numeric character!',
                    'password.noWhiteSpaces': '{#label} should not contain white spaces!',
                    'password.required': '{#label} cannot be empty!',
                }),
}).validate(input, { abortEarly: false });

const secret = process.env.JWT_SECRET;

const handler = async (req, res)=> {
    connectToMongo();
    if(req.method === "POST") {
        let success = false;
        try {
            const {name, email, password} = req.body;
            const {error} = schema({ name, email, password });
            if(error) {
                success = false;
                return res.status(400).json({success, error: error.details[0].message});
            }

            const confirmUser = await User.findOne({email: email});
            if(confirmUser) {
                success = false;
                return res.status(400).json({success, error: "This email is already associated to another account!"});
            }

            const salt = await bcrypt.genSalt(10);
            const securePassword = await bcrypt.hash(password, salt);

            const user = await User.create({
                name: name,
                email: email,
                password: securePassword
            });

            const data = {
                user: {
                    id: user.id
                }
            };

            const authToken = jwt.sign(data, secret);
            setCookies("auth_token", authToken, {req, res, maxAge: 60 * 60 * 24});
            success = true;
            return res.status(200).json({success});
            
        } catch (error) {
            success = false;
            return res.status(500).json({success, error: error.message});
        }

    }
};

export default handler;