import connectToMongo from "../../../db";
import fetchUser from "../../../middlewares/fetchUser";
import Joi from "joi";
import { setCookie } from "cookies-next";

import Folder from "../../../models/Folder";
import User from "../../../models/User";
import Note from "../../../models/Note";

const schema = (input) => 
Joi.object({
    name: Joi.string().replace(/\s/g, "").trim().min(3).max(15).required().messages({
        'name.min': '{#label} should contain at least {#min} characters!',
        'name.max': '{#label} should contain at most {#max} characters!',
        'name.required': '{#label} cannot be empty!',
    })
}).validate(input, { abortEarly: false });

const handler = async (req, res)=> {
  connectToMongo();
  if (req.method === 'POST') {
    let success;
    try {
      const userId = req.user.id;
      const {name} = req.body;
      const {error} = schema({ name });
      if(error) {
        success = false;
        return res.status(400).json({success, error: error.details[0].message});
      }

      let user = await User.findById(userId);
      if(!user) {
        success = false;
        return res.status(404).json({success, error: "User doesnot exist!"});
      }
      
      const folder = await Folder.create({
        name: name,
        user: userId
      });

      user = await User.findByIdAndUpdate(userId, {$push: {folders: folder}}, {new: true})
        .select("-password")
        .select("-folders");

      const folders = await Folder.find({user: userId})
        .sort({name: 1});

      setCookie("jn_profile", JSON.stringify(user), (req, res));

      success = true;
      return res.status(200).json({ success, folders });

    } catch (error) {
      success = false;
      return res.status(500).json({success, error: error.message});
    }
  }
};

export default fetchUser(handler);
