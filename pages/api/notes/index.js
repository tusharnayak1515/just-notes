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
      const folderId = req.query.folder;
      if(folderId.length !== 24) {
        success = false;
        return res.status(400).json({success, error: "Invalid folderId"});
      }
      const user = await User.findById(userId);
      if(!user) {
        success = false;
        return res.json({success, error: "User doesnot exist", status: 404});
      }
      
      const notes = await Note.find({user: userId, folder: folderId})
        .sort("-createdAt");

      success = true;
      return res.status(200).json({ success, notes });

    } catch (error) {
      success = false;
      return res.json({success, error: error.message, status: 500});
    }
  }
}

export default fetchUser(handler);
