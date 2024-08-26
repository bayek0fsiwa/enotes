import path from "node:path";
import express from "express";
import { addNote, updateNote, listNotes, getSingleNote, deleteNote } from "./noteController";
import multer from "multer";
import authenticate from "../middlewares/authenticate";

const noteRouter = express.Router();

const upload = multer({
    dest: path.resolve(__dirname, "../../public/data/uploads"),
    limits: { fileSize: 3e7 }, // 30 MB

});

noteRouter.get("/", listNotes)

noteRouter.get("/:noteId", getSingleNote)

noteRouter.post("/", authenticate, upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "file", maxCount: 1 },
]), addNote);


noteRouter.patch("/:noteId", authenticate, upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "file", maxCount: 1 },
]), updateNote);

noteRouter.delete("/:noteId", authenticate, deleteNote)

export default noteRouter;
