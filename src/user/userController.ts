import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import bcrypt from "bcrypt"
import userModel from "./userModel"


export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        const error = createHttpError(400, "All fields are require");
        return next(error);
    }

    const user = await userModel.findOne({ email })

    if (user) {
        const error = createHttpError(400, "User already exist with this email.");
        return next(error);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
        name,
        email,
        password: hashedPassword
    })

    res.status(200).json({ id: newUser._id })
}
