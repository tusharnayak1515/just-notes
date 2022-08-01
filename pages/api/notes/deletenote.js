import connectToMongo from "../../../db";
import fetchUser from "../../../middlewares/fetchUser";
import User from "../../../models/User";
import Note from "../../../models/Note";

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

      user = await User.findByIdAndUpdate(userId, {$pull: {notes: noteId}}, {new: true})
        .select("-password");

      note = await Note.findByIdAndDelete(noteId, {new: true});

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
