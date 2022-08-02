import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";

interface IReq extends Request {
  user: string | JwtPayload;
  headers: {
    token: string;
  };
}

declare var process: {
  env: {
    JWT_SECRET: Secret;
  };
};

const requireAuth = (req: IReq, res: Response, next: NextFunction) => {
  const { token } = req.headers;

  if (!token) return res.status(401).json({ error: "Access denied." });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;

    return next();
  } catch {
    return res.status(401).json({ error: "Access denied." });
  }
};

export default requireAuth;
