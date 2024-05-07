import express from "express";
import { addNote } from "./notesController";

const userRouter = express.Router();

userRouter.post("/add", addNote);

export default userRouter;
