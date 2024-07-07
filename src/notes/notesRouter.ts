import express from "express";
import { addNote, updateNote } from "./notesController";
import multer from "multer";
import path from "path";
import authenticate from "../middlewares/authenticate";

const userRouter = express.Router();

const upload = multer({
    dest: path.resolve(__dirname, "../../public/data/uploads"),
    limits: { fileSize: 1e7 }, // 10 MB

});

userRouter.post("/add", authenticate, upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "file", maxCount: 1 },
]), addNote);


userRouter.patch("/:noteId", authenticate, upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "file", maxCount: 1 },
]), updateNote);


export default userRouter;
