import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import UserModel from "../models/user.model";


export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(401);
    }

    req.user = user as Object;

    next();
  });
};

export const checkUser = (req:Request, res:Response, next:NextFunction) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (error: undefined |any, decodedToken: undefined | any) => {
      if (error) {
        res.locals["user"] = null;
        res.cookie("jwt", "", { maxAge: 1 });
        next();
      } else {
        let user = await UserModel.findById(decodedToken.id);
        res.locals["user"] = user;
        next();
      }
    });
  } else {
    res.locals["user"] = null;
    next();
  }
};

export const requireAuth = (req:Request, res:Response, next:NextFunction) => {
  const token = req.cookies.jwt;
  if (req.cookies.jwt !== undefined) {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (error: undefined |any, decodedToken: undefined | any) => {
      if (error) {
        console.log(error);
        res.send(400).json("no token");
      } else {
        next();
      }
    });
  } else {
    console.log("No Token");
    res.status(400).send("No Token");
  }
};

