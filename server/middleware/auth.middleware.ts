import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
// user defined
import Config from "../config/config.json";

const auth = (req: Request, res: Response, next: NextFunction) => {
  // Get token from header
  const token = req.header("x-auth-token");

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  // Verify token
  try {
    jwt.verify(token, Config.JWT, (error: any, decoded: { user: any }) => {
      if (error) {
        return res.status(401).json({ msg: "Token is not valid" });
      } else {
        res.locals.user = decoded.user;
        next();
      }
    });
  } catch (err) {
    console.error("something wrong with auth middleware");
    res.status(500).json({ msg: "Server Error" });
  }
};

export default auth;
