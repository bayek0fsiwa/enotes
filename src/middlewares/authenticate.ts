import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import { config } from "../configs/config";


export interface AuthRequest extends Request {
    userId: string;
}


const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("Authorizaton");

    if (!token) {
        return next(createHttpError(401, "Authorization error."))
    }

    try {
        const parsedToken = token.split(" ")[1]
        const decoded = jwt.verify(parsedToken, config.jwtSecret as string);
        const _req = req as AuthRequest
        _req.userId = decoded.sub as string;
        next();
    } catch (error) {
        return next(createHttpError(401, "Authorization error."))
    }
}

export default authenticate;
