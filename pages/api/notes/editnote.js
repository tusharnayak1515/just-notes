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
        'title.max': '{#label} should contain at most {#max} characters!'
    }),
    description: Joi.string().replace(/\s/g, "").trim().min(3).required().messages({
        'description.min': '{#label} should contain at least {#min} characters!'
    }),
}).validate(input, { abortEarly: false });

const handler = async (req, res)=> {
  connectToMongo();
  if (req.method === 'PUT') {
    let success;
    try {
      const userId = req.user.id;
      const noteId = req.query.note;
      if(noteId.length !== 24) {
        success = false;
        return res.status(400).json({success, error: "Invalid noteId"});
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
      
      let note = await Note.findById(noteId);
      if(!note) {
        success = false;
        return res.status(404).json({success, error: "Note Doesnot exist!"})
      }

      const folderId = note.folder.toString();
      let folder = await Folder.findById(folderId);
      if(!folder) {
        success = false;
        return res.status(404).json({success, error: "Folder doesnot exist!"});
      }

      note = await Note.findByIdAndUpdate(noteId, {title: title, description: description}, {new: true});

      const notes = await Note.find({user: userId, folder: folderId})
        .sort("-createdAt");

      success = true;
      return res.status(200).json({ success, note, notes });

    } catch (error) {
      success = false;
      return res.status(500).json({success, error: error.message});
    }
  }
};

export default fetchUser(handler);
