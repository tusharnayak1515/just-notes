import fetchUser from '../../../middlewares/fetchUser';
import { getCookie, deleteCookie } from 'cookies-next';

const handler = async (req, res)=> {
  const link = process.env.NODE_ENV === "production" ? "https://just-notes.vercel.app" : "http://localhost:3000";
  if (req.method === 'GET') {
    let success;
    try {
      const token = getCookie("auth_token",{req, res}) || req.user.id;
      const profile = getCookie("jn_profile",{req, res});
      deleteCookie(token,{ path: '/', domain: link });
      deleteCookie(profile,{ path: '/', domain: link });
      success = true;
      return res.status(200).json({ success });

    } catch (error) {
      success = false;
      return res.json({success, error: error.message, status: 500});
    }
  }
};

export default fetchUser(handler);