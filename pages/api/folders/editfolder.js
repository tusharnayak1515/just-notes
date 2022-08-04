import connectToMongo from "../../../db";
import fetchUser from "../../../middlewares/fetchUser";
import Joi from "joi";

import Folder from "../../../models/Folder";
import User from "../../../models/User";
import Note from "../../../models/Note";

const schema = (input) => 
Joi.object({
    name: Joi.string().replace(/\s/g, "").trim().min(3).max(20).required().messages({
        'name.min': '{#label} should contain at least {#min} characters!',
        'name.max': '{#label} should contain at most {#max} characters!'
    })
}).validate(input, { abortEarly: false });

const handler = async (req, res)=> {
  connectToMongo();
  if (req.method === 'PUT') {
    let success;
    try {
      const userId = req.user.id;
      const folderId = req.query.folder;
      if(folderId.length !== 24) {
        success = false;
        return res.status(400).json({success, error: "Invalid folderId"});
      }

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
      
      let folder = await Folder.findById(folderId);
      if(!folder) {
        success = false;
        return res.status(404).json({success, error: "Folder Doesnot exist!"})
      }

      folder = await Folder.findByIdAndUpdate(folderId, {name: name}, {new: true});

      const folders = await Folder.find({user: userId})
        .sort("-createdAt");

      success = true;
      return res.status(200).json({ success, folder, folders });

    } catch (error) {
      success = false;
      return res.status(500).json({success, error: error.message});
    }
  }
};

export default fetchUser(handler);
