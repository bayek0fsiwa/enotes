import path from "node:path";
import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import cloudinary from "../configs/cloudinary";

export const addNote = async (req: Request, res: Response, next: NextFunction) => {
    // console.log("file", req.files)
    const files = req.files as { [filename: string]: Express.Multer.File[] };
    const coverImageMimeType = files.coverImage[0].mimetype.split("/").at(-1);
    const fileName = files.coverImage[0].filename;
    const filePath = path.resolve(__dirname, "../../public/data/uploads", fileName);
    const uploadResult = await cloudinary.uploader.upload(filePath, {
        filename_override: fileName,
        folder: "note-covers",
        format: coverImageMimeType,
    });

    const noteFileName = files.file[0].filename;

    console.log(uploadResult);
    res.status(200).json({ message: "OK" })
}
