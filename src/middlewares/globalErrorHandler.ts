import { NextFunction, Request, Response } from "express";
import { HttpError } from "http-errors";
import { config } from "../configs/config";


export default function globalErrorHandler() {
    (err: HttpError, req: Request, res: Response, next: NextFunction) => {
        const statusCode = err.statusCode || 500;
        return res.status(statusCode).json({
            message: err.message,
            errStack: config.env === "development" ? err.stack : "",
        });
    }
}
