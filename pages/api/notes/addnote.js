import connectToMongo from "../../../db";
import fetchUser from "../../../middlewares/fetchUser";
import Joi from "joi";

import User from "../../../models/User";
import Note from "../../../models/Note";
import Folder from "../../../models/Folder";

const schema = (input) => 
Joi.object({
    title: Joi.string().replace(/\s/g, "").trim().min(3).max(20).required().messages({
        'title.min': '{#label} should contain at least {#min} characters!',
        'title.max': '{#label} should contain at most {#max} characters!',
        'title.required': '{#label} cannot be empty!',
    }),
    description: Joi.string().replace(/\s/g, "").trim().min(3).required().messages({
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
      const folderId = req.query.folder;
      if(folderId.length !== 24) {
        success = false;
        return res.status(400).json({success, error: "Invalid folderId"});
      }
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

      let folder = await Folder.findById(folderId);
      if(!folder) {
        success = false;
        return res.status(404).json({success, error: "Folder doesnot exist!"});
      }
      
      const note = await Note.create({
        title: title,
        description: description,
        folder: folderId,
        user: userId
      });

      folder = await Folder.findByIdAndUpdate(folderId, {$push: {notes: note}}, {new: true});

      const notes = await Note.find({user: userId, folder: folderId})
        .sort("-createdAt");

      success = true;
      return res.status(200).json({ success, folder, notes });

    } catch (error) {
      success = false;
      return res.status(500).json({success, error: error.message});
    }
  }
};

export default fetchUser(handler);
