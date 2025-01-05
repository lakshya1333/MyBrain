import { NextFunction, Request, Response } from "express";
import * as dotenv from 'dotenv'
dotenv.config()
import jwt from "jsonwebtoken";

export const userMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers["token"];
    const decoded = jwt.verify(header as string, process.env.JWT_SECRET as string);
    if (decoded) {
        // @ts-ignore
        req.userId = decoded.id;
        next();
    } else {
        res.status(401).json({ message: "Unauthorized User" });
    }
};