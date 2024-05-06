import app from "./src/app";
import { config } from "./src/configs/config";


const startServer = () => {
    const port = config.port || 8080;

    app.listen(port, () => {
        console.log(`Running on http://localhost:${port}`);
    });
}


startServer();
