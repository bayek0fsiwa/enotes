import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";

export const addNote = async (req: Request, res: Response, next: NextFunction) => {
    console.log("file", req.files)
    res.status(200).json({ message: "OK" })
}
