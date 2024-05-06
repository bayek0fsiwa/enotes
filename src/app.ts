import express, { NextFunction, Request, Response } from "express";
import helmet from "helmet";
import { HttpError } from "http-errors";
import morgan from "morgan";
import { config } from "./configs/config";


// App init
const app = express();

// Middlewares
app.use(helmet());
app.use(morgan("dev"));


// Root route
app.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({ message: "Working.😊" })
})


app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    return res.status(statusCode).json({
        message: err.message,
        errStack: config.env === "development" ? err.stack : "",
    });
});


export default app;
