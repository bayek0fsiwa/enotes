import mongoose from "mongoose";
import { Note } from "./noteType"

const noteSchema = new mongoose.Schema<Note>({
    title: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    coverImage: {
        type: String,
        required: true
    },
    file: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },

}, { timestamps: true })

export default mongoose.model<Note>("Note", noteSchema);
