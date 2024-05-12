import { NextFunction, Request, Response } from "express";
// import createHttpError from "http-errors";
import cloudinary from "../configs/cloudinary"
import path from "path";

export const addNote = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const files = req.files as { [fieldname: string]: Express.Multer.File[] }
        const coverImageMimeType = files.coverImage[0].mimetype.split("/").at(-1);
        const fileName = files.coverImage[0].filename;
        const filePath = path.resolve(__dirname, "../../public/data/uploads", fileName);

        const uploadResult = await cloudinary.uploader.upload(filePath, {
            filename_override: fileName,
            folder: "note-cover",
            format: coverImageMimeType,
        });

        const noteFileName = files.file[0].filename;
        const noteFilePath = path.resolve(__dirname, "../../public/data/uploads", noteFileName);
        const noteFileUploadRes = await cloudinary.uploader.upload(noteFilePath, {
            resource_type: "raw",
            filename_override: noteFileName,
            folder: "notes-pdf",
            format: "pdf",
        });

        console.log(noteFileUploadRes);
        console.log(uploadResult)
    } catch (error) {
        console.log(error)
    }
    res.status(200).json({ message: "OK" })
}
