import path from "node:path";
import fs from "node:fs";
import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import cloudinary from "../configs/cloudinary";
import noteModel from "./noteModel";
import { AuthRequest } from "../middlewares/authenticate";


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
        // add note to database
        const _req = req as AuthRequest;
        const newNote = await noteModel.create({
            title,
            genre,
            author: _req.userId,
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


export const updateNote = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { title, genre } = req.body
        const noteId = req.params.noteId

        const note = await noteModel.findOne({ _id: noteId })

        if (!note) {
            return next(createHttpError(404, "Note not found"))
        }

        const _req = req as AuthRequest

        if (note.author.toString() !== _req.userId) {
            return next(createHttpError(403, "Unauthorized"))
        }

        const files = req.files as { [fieldname: string]: Express.Multer.File[] }
        let completeCoverImage = ""

        if (files.coverImage) {
            const filename = files.coverImage[0].filename
            const coverMimeType = files.coverImage[0].mimetype.split("/").at(-1)
            const filePath = path.resolve(__dirname, "../../public/data/uploads/" + filename)
            completeCoverImage = filename
            const uploadResult = await cloudinary.uploader.upload(filePath, {
                filename_override: completeCoverImage,
                folder: "note-covers",
                format: coverMimeType
            })

            completeCoverImage = uploadResult.secure_url
            await fs.promises.unlink(filePath)
        }

        let completeFileName = ""

        if (files.file) {
            const noteFilePath = path.resolve(__dirname, "../../public/data/uploads/" + files.file[0].filename)
            const noteFileName = files.file[0].filename
            completeFileName = noteFileName

            const uploadResultPdf = await cloudinary.uploader.upload(noteFilePath, {
                resource_type: "raw",
                filename_override: completeFileName,
                folder: "note-pdfs",
                format: "pdf"
            })

            completeFileName = uploadResultPdf.secure_url
            await fs.promises.unlink(noteFilePath)
        }

        const updateNote = await noteModel.findOneAndUpdate({ _id: noteId }, { title: title, genre: genre, coverImage: completeCoverImage ? completeCoverImage : note.coverImage, file: completeFileName ? completeFileName : note.file }, { new: true })
        res.json(updateNote)

    } catch (err) {
        next(createHttpError(500, "cannot update note!"))
    }

}

export const listNotes = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const note = await noteModel.find()
        res.json(note)
    } catch (err) {
        return next(createHttpError(500, "Error while getting notes"))
    }
}


export const getSingleNote = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const noteId = req.params.noteId
        const note = await noteModel.findOne({_id: noteId})
        if (!note) {
            return next(createHttpError(404, "Note not found"))
        }
        res.json(note)
    } catch (error) {
        return next(createHttpError(500, "Failed fetching notes"))
    }
}
