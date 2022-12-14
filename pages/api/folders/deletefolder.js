import connectToMongo from "../../../db";
import fetchUser from "../../../middlewares/fetchUser";
import { setCookie } from "cookies-next";

import Folder from "../../../models/Folder";
import User from "../../../models/User";
import Note from "../../../models/Note";

const handler = async (req, res)=> {
  connectToMongo();
  if (req.method === 'DELETE') {
    let success;
    try {
      const userId = req.user.id;
      const folderId = req.query.folder;
      if(folderId.length !== 24) {
        success = false;
        return res.status(400).json({success, error: "Invalid folderId"});
      }

      let user = await User.findById(userId);
      if(!user) {
        success = false;
        return res.status(404).json({success, error: "User doesnot exist!"});
      }
      
      let folder = await Folder.findById(folderId);
      if(!folder) {
        success = false;
        return res.status(404).json({success, error: "FOlder Doesnot exist!"})
      }

      user = await User.findByIdAndUpdate(userId, {$pull: {folders: folderId}}, {new: true})
        .select("-password")
        .select("-folders");

      for(let i=0; i<folder.notes.length; i++) {
        let note = await Note.findByIdAndDelete(folder.notes[i].toString(),{new: true});
      }

      folder = await Folder.findByIdAndDelete(folderId, {new: true});

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
