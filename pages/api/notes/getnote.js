import connectToMongo from "../../../db";
import fetchUser from "../../../middlewares/fetchUser";

import User from "../../../models/User";
import Note from "../../../models/Note";

const handler = async (req, res)=> {
  connectToMongo();
  if (req.method === 'GET') {
    let success;
    try {
      const userId = req.user.id;
      const noteId = req.query.note;
      if(noteId.length != 24) {
        success = false;
        return res.json({success, error: "Invalid noteId!", status: 400});
      }

      const user = await User.findById(userId);
      if(!user) {
        success = false;
        return res.json({success, error: "User doesnot exist!", status: 404});
      }
      
      const note = await Note.findById(noteId);
      if(!note) {
        success = false;
        return res.status(404).json({success, error: "Note doesnot exist!"});
      }

      success = true;
      return res.json({ success, note, status: 200 });

    } catch (error) {
      success = false;
      return res.json({success, error: error.message, status: 500});
    }
  }
};

export default fetchUser(handler);
