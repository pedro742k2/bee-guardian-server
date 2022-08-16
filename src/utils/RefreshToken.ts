import { Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import { signToken } from "../Validations/signToken";

interface IReq extends Request {
  headers: {
    refresh_token: string;
  };
}

declare var process: {
  env: {
    JWT_SECRET: Secret;
  };
};

interface IUser {
  user_id: number;
}

export const handleRefreshToken = (req: IReq, res: Response) => {
  const { refresh_token } = req.headers;

  if (!refresh_token) return res.status(401).json({ error: "Access denied." });

  const { JWT_SECRET } = process.env;

  try {
    const { user_id } = jwt.verify(refresh_token, JWT_SECRET) as IUser;

    const newToken = signToken(user_id, "session_token");
    const newRefreshToken = signToken(user_id, "refresh_token");

    return res.json({ token: newToken, refresh_token: newRefreshToken });
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: "Access denied." });
  }
};
