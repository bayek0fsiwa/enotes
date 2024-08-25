import path from "node:path";
import fs from "node:fs";
import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import cloudinary from "../configs/cloudinary";
import noteModel from "./noteModel";

export const addNote = async (req: Request, res: Response, next: NextFunction) => {
    const { title, genre } = req.body;
    try {
        // upload cover image to cloudinary
        const files = req.files as { [filename: string]: Express.Multer.File[] };
        const coverImageMimeType = files.coverImage[0].mimetype.split("/").at(-1);
        const fileName = files.coverImage[0].filename;
        const filePath = path.resolve(__dirname, "../../public/data/uploads", fileName);
        const uploadResult = await cloudinary.uploader.upload(filePath, {
            filename_override: fileName,
            folder: "note-covers",
            format: coverImageMimeType,
        });
        // upload note pdf to cloudinary
        const noteFileName = files.file[0].filename;
        const noteFilePath = path.resolve(__dirname, "../../public/data/uploads", noteFileName);
        const noteUploadResult = await cloudinary.uploader.upload(noteFilePath, {
            resource_type: "raw",
            filename_override: noteFileName,
            folder: "note-pdfs",
            format: "pdf"
        });
        console.log(uploadResult);
        console.log(noteUploadResult);
        // add note to database
        const newNote = await noteModel.create({
            title,
            genre,
            author: "66cabcf80fd8a293f2310018",
            coverImage: uploadResult.secure_url,
            file: noteUploadResult.secure_url,
        })
        // delete files from local system
        await fs.promises.unlink(filePath);
        await fs.promises.unlink(noteFilePath);
        // send response
        res.status(201).json({ id: newNote._id });
    } catch (err) {
        console.error(err);
        return next(createHttpError(500, "Error while uploading file!"));
    }
}
