import express, { NextFunction, Request, Response } from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import userRouter from "./user/userRouter";
import noteRouter from "./note/noteRouter";


// App init
const app = express();

// Middlewares
app.use(cors({ origin: '*' }))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(morgan("dev"));


// Root route
app.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({ message: "Working.😊" })
})


// Routers
app.use("/api/users", userRouter);
app.use("/api/notes", noteRouter);

// Global error handler
app.use(globalErrorHandler);


export default app;
