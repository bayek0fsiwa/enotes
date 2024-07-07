import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import cloudinary from "../configs/cloudinary"
import path from "path";
import fs from "node:fs";
import notesModel from "./notesModel";
import { AuthRequest } from "../middlewares/authenticate";

export const addNote = async (req: Request, res: Response, next: NextFunction) => {
    const { title, genre } = req.body;

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

        const _req = req as AuthRequest;

        const newNote = await notesModel.create({
            title,
            genre,
            author: _req.userId,
            coverImage: uploadResult.secure_url,
            file: noteFileUploadRes.secure_url,
        })

        try {
            await fs.promises.unlink(filePath);
            await fs.promises.unlink(noteFilePath);
        } catch (error) {
            console.error(error);
        }

        // console.log(noteFileUploadRes);
        // console.log(uploadResult)
        res.status(201).json({ id: newNote._id })
    } catch (error) {
        console.error(error)
        return next(createHttpError(500, "Something went wrong."))
    }
}


export const updateNote = async (req: Request, res: Response, next: NextFunction) => {
    const { title, genre } = req.body;
    const noteId = req.params.noteId;

    const note = await notesModel.findOne({ _id: noteId });

    if (!note) {
        return next(createHttpError(404, "Not found"))
    }

    const _req = req as AuthRequest;

    if (note.author.toString() !== _req.userId) {
        return next(createHttpError(403, "Unauthorized to perform this action."))
    }

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

        const _req = req as AuthRequest;

        const newNote = await notesModel.create({
            title,
            genre,
            author: _req.userId,
            coverImage: uploadResult.secure_url,
            file: noteFileUploadRes.secure_url,
        })

        try {
            await fs.promises.unlink(filePath);
            await fs.promises.unlink(noteFilePath);
        } catch (error) {
            console.error(error);
        }

        // console.log(noteFileUploadRes);
        // console.log(uploadResult)
        res.status(201).json({ id: newNote._id })
    } catch (error) {
        console.error(error)
        return next(createHttpError(500, "Something went wrong."))
    }
}
