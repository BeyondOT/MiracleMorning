import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserInfos } from "../../@types/express";

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token: string = req.cookies.jwt;
  
  if (!token) {
    return res.status(401).json({message: "No token"});
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(401).json(err);
    }
    req.user = user as UserInfos;

    next();
  });
};
