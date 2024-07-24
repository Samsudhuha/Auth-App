import jwt, { JwtPayload } from 'jsonwebtoken';
import userModel from '../models/userModel';

const { AUTH_TOKEN_KEY } = process.env;

export const checkAuthToken = async (req: any, res: any, next: any) => {
  const auth_token = req.headers["x-access-token"] as string;

  try {
    if (!auth_token) {
      throw res.status(403).json({ error: "Unauthorized" });
    }

    const decodedUserInfo = jwt.verify(auth_token, AUTH_TOKEN_KEY!) as JwtPayload;
      // Check if user actually exist in db
    const user = await userModel.findOne({ email: decodedUserInfo.email }).select("+password").exec();
    if(!user) {
      throw res.status(403).json({ error: "Unauthorized" });
    }

    req.user = user;
  } catch (error) {
    return res.status(403).json({error: 'Unauthorized'});
  }
  
  return next();
};