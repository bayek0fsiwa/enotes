import express, { NextFunction, Request, Response } from "express";
import helmet from "helmet";
import morgan from "morgan";
import globalErrorHandler from "./middlewares/globalErrorHandler";


// App init
const app = express();

// Middlewares
app.use(helmet());
app.use(morgan("dev"));


// Root route
app.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({ message: "Working.😊" })
})


app.use(globalErrorHandler);


export default app;
