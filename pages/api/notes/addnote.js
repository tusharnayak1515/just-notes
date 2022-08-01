import connectToMongo from "../../../db";
import fetchUser from "../../../middlewares/fetchUser";
import Joi from "joi";

import User from "../../../models/User";
import Note from "../../../models/Note";

const schema = (input) => 
Joi.object({
    title: Joi.string().min(3).max(25).required().messages({
        'title.min': '{#label} should contain at least {#min} characters!',
        'title.max': '{#label} should contain at most {#max} characters!',
        'title.required': '{#label} cannot be empty!',
    }),
    description: Joi.string().min(3).required().messages({
        'description.min': '{#label} should contain at least {#min} characters!',
        'description.required': '{#label} cannot be empty!'
    }),
}).validate(input, { abortEarly: false });

const handler = async (req, res)=> {
  connectToMongo();
  if (req.method === 'POST') {
    let success;
    try {
      const userId = req.user.id;
      const {title, description} = req.body;
      const {error} = schema({ title, description });
      if(error) {
        success = false;
        return res.status(400).json({success, error: error.details[0].message});
      }

      let user = await User.findById(userId);
      if(!user) {
        success = false;
        return res.status(404).json({success, error: "User doesnot exist!"});
      }
      
      const note = await Note.create({
        title: title,
        description: description,
        user: userId
      });

      user = await User.findByIdAndUpdate(userId, {$push: {notes: note}}, {new: true})
        .select("-password");

      const notes = await Note.find({user: userId})
        .sort("-createdAt");

      success = true;
      return res.status(200).json({ success, user, notes });

    } catch (error) {
      success = false;
      return res.status(500).json({success, error: error.message});
    }
  }
};

export default fetchUser(handler);
