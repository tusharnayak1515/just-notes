import connectToMongo from "../../../db";
import fetchUser from "../../../middlewares/fetchUser";

import User from "../../../models/User";
import Note from "../../../models/Note";
import Folder from "../../../models/Folder";

const handler = async (req, res)=> {
  connectToMongo();
  if (req.method === 'DELETE') {
    let success;
    try {
      const userId = req.user.id;
      const noteId = req.query.note;
      if(noteId.length !== 24) {
        success = false;
        return res.status(400).json({success, error: "Invalid noteId"});
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

      folder = await Folder.findByIdAndUpdate(folderId, {$pull: {notes: noteId}}, {new: true});

      note = await Note.findByIdAndDelete(noteId, {new: true});

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
