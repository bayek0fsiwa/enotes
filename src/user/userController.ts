import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import bcrypt from "bcrypt"
import userModel from "./userModel"
import { sign } from "jsonwebtoken";
import { config } from "../configs/config"
import { User } from "./userTypes";


export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        const error = createHttpError(400, "All fields are require");
        return next(error);
    }

    try {

        const user = await userModel.findOne({ email })

        if (user) {
            const error = createHttpError(400, "User already exist with this email.");
            return next(error);
        }

    } catch (err) {
        return next(createHttpError(500, "Error while getting user!"))
    }



    const hashedPassword = await bcrypt.hash(password, 10);

    let newUser: User;

    try {
        newUser = await userModel.create({
            name,
            email,
            password: hashedPassword
        })
    } catch (err) {
        return next(createHttpError(500, "Error while registering user!"))
    }

    try {
        const token = sign({ sub: newUser._id }, config.jwtSecret as string, { expiresIn: "7d", algorithm: "HS256", })
        res.status(200).json({ accessToken: token })
    } catch (err) {
        return next(createHttpError(500, "Error while signing token."))
    }
}
