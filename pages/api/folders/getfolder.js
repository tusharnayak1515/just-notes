import connectToMongo from "../../../db";
import fetchUser from "../../../middlewares/fetchUser";

import Folder from "../../../models/Folder";
import User from "../../../models/User";
import Note from "../../../models/Note";

const handler = async (req, res)=> {
  connectToMongo();
  if (req.method === 'GET') {
    let success;
    try {
      const userId = req.user.id;
      const folderId = req.query.folder;
      if(folderId.length != 24) {
        success = false;
        return res.json({success, error: "Invalid folderId!", status: 400});
      }

      const user = await User.findById(userId);
      if(!user) {
        success = false;
        return res.json({success, error: "User doesnot exist!", status: 404});
      }
      
      const folder = await Folder.findById(folderId);
      if(!folder) {
        success = false;
        return res.status(404).json({success, error: "Folder doesnot exist!"});
      }

      success = true;
      return res.json({ success, folder, status: 200 });

    } catch (error) {
      success = false;
      return res.json({success, error: error.message, status: 500});
    }
  }
};

export default fetchUser(handler);
