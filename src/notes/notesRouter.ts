import express from "express";
import { addNote } from "./notesController";
import multer from "multer";
import path from "path";

const userRouter = express.Router();

const upload = multer({
    dest: path.resolve(__dirname, "../../public/data/uploads"),
    limits: { fileSize: 3e7 }, // 30 MB

});

userRouter.post("/add", upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "file", maxCount: 1 },
]), addNote);

export default userRouter;
