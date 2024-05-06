import app from "./src/app";
import { config } from "./src/configs/config";
import connectDB from "./src/configs/db";


const startServer = async () => {

    const port = config.port || 8080;

    await connectDB(config.dbURL as string);

    app.listen(port, () => {
        console.log(`Running on http://localhost:${port}`);
    });
}


startServer();
