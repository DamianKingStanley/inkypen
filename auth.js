import jwt from "jsonwebtoken";
import decode from "jwt-decode";
import dotenv from "dotenv";

dotenv.config();
const secret = process.env.JWT_SECRET;

const auth = async (req, res, next) => {
  try {
    const token = await req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const decodeToken = decode(token);

    if (decodeToken.exp * 1000 < Date.now()) {
      return res.status(401).json({ error: "Token has expired" });
    }

    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "Invalid token" });
      }

      req.userId = decoded?._id;
      next();
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

export default auth;
